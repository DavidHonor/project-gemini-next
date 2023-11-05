import {
    GRAVITY_SOURCE,
    PartTypes,
    RocketPartPrototypes,
} from "@/config/rocket_parts";
import {
    burnTime,
    calculateDrag,
    calculateGravitationalForce,
    fuelMassCalc,
    getDeltaV,
    massFlowRate,
} from "@/lib/ship_functions";

import { Rocket } from "@/types/rocket";
import {
    FlightData,
    FlightRecord,
    Point,
    RocketStats,
    StageStats,
    Trajectory,
} from "@/types/rocket_stats";

import { Derivative, rk4, rk4Vars } from "./RugenKutta";

function initStageSummary(stageId: string) {
    return {
        stageId: stageId,

        individual: {
            totalMass: 0,
            dryMass: 0,

            totalThrust: 0,
            totalIsp: 0,
            totalMassFlowRate: 0,
            burnTime: 0,

            deltaV: 0,
        },

        stacked: {
            totalMass: 0,
            dryMass: 0,

            totalThrust: 0,
            totalIsp: 0,
            burnTime: 0,

            deltaV: 0,
        },
    };
}

export function calculateRocketStats(rocket: Rocket): RocketStats {
    const largestSection = (() => {
        let max = 0;
        for (let stage of rocket.stages) {
            for (let part of stage.parts) {
                if (part.part_type !== PartTypes.FUELTANK || !part.diameter)
                    continue;
                if (max < part.diameter) max = part.diameter;
            }
        }
        return max;
    })();

    const stageStats = (() => {
        let results: StageStats[] = [];
        for (let stage of rocket.stages) {
            let stageSummary: StageStats = initStageSummary(stage.id);
            let ispThrustSum = 0;

            for (let part of stage.parts) {
                stageSummary.individual.dryMass += part.weight;
                stageSummary.stacked.dryMass += part.weight;

                stageSummary.individual.totalMass += part.weight;
                stageSummary.stacked.totalMass += part.weight;

                const protPart = RocketPartPrototypes.find(
                    (x) => x.name === part.name
                );
                if (part.part_type === PartTypes.ENGINE) {
                    if (!protPart)
                        throw new Error(
                            "stage statistics calculation error, reference part not found"
                        );
                    if (typeof protPart.thrust_sl === "undefined")
                        throw new Error(
                            "thrust_sl is not defined for the given part"
                        );

                    stageSummary.individual.totalThrust += protPart.thrust_sl;
                    stageSummary.stacked.totalThrust += protPart.thrust_sl;

                    ispThrustSum += protPart.thrust_sl * protPart.isp_sl;
                    stageSummary.individual.totalMassFlowRate += massFlowRate(
                        protPart.isp_sl,
                        protPart.thrust_sl,
                        GRAVITY_SOURCE.EARTH
                    );
                } else if (part.part_type === PartTypes.FUELTANK) {
                    if (!protPart)
                        throw new Error(
                            "stage statistics calculation error, reference part not found"
                        );
                    if (
                        typeof protPart.diameter === "undefined" ||
                        typeof protPart.length === "undefined"
                    )
                        throw new Error(
                            "diameter or length is not defined for the given part"
                        );

                    stageSummary.individual.totalMass += fuelMassCalc(protPart);
                    stageSummary.stacked.totalMass =
                        stageSummary.individual.totalMass;
                }
            }

            //=== Individual stage total ISP ===
            if (stageSummary.individual.totalThrust !== 0) {
                stageSummary.individual.totalIsp =
                    ispThrustSum / stageSummary.individual.totalThrust;
                stageSummary.stacked.totalIsp =
                    ispThrustSum / stageSummary.stacked.totalThrust;
            }

            //=== Individual stage deltaV ===
            stageSummary.individual.deltaV = getDeltaV(
                stageSummary.individual.totalMass,
                stageSummary.individual.dryMass,
                stageSummary.individual.totalIsp,
                GRAVITY_SOURCE.EARTH
            );

            //=== Individual stage burnTime ===
            if (stageSummary.individual.totalMassFlowRate !== 0) {
                const totalFuelMass =
                    stageSummary.individual.totalMass -
                    stageSummary.individual.dryMass;
                stageSummary.individual.burnTime = burnTime(
                    totalFuelMass,
                    stageSummary.individual.totalMassFlowRate
                );
            }

            results.push(stageSummary);
        }

        //=== Stacked stages performace ===
        //deltaV of the uppermost stacked stage is equal to the individual
        if (results.length) {
            results[results.length - 1].stacked.deltaV =
                results[results.length - 1].individual.deltaV;
            results[results.length - 1].stacked.burnTime =
                results[results.length - 1].individual.burnTime;
        }
        for (let i = results.length - 1; i > 0; i--) {
            results[i - 1].stacked.dryMass += results[i].stacked.totalMass;

            results[i - 1].stacked.totalMass += results[i].stacked.totalMass;

            results[i - 1].stacked.deltaV = getDeltaV(
                results[i - 1].stacked.totalMass,
                results[i - 1].stacked.dryMass,
                results[i - 1].stacked.totalIsp,
                GRAVITY_SOURCE.EARTH
            );

            //burn time
            const totalFuelMass =
                results[i - 1].stacked.totalMass -
                results[i - 1].stacked.dryMass;
            results[i - 1].stacked.burnTime = burnTime(
                totalFuelMass,
                results[i - 1].individual.totalMassFlowRate
            );
        }

        return results;
    })();

    const getFlightData = (): FlightData => {
        let flightRecords: FlightRecord[] = [];
        if (!stageStats) return { records: flightRecords };

        let prevSecond = 0;

        let altitude = 0;
        let velocity = 0;

        const TIMESTEP = 1;
        for (let stageStat of stageStats) {
            for (
                let second = 0;
                second <= stageStat.stacked.burnTime;
                second += TIMESTEP
            ) {
                let currentMass =
                    stageStat.stacked.totalMass -
                    stageStat.individual.totalMassFlowRate * second;
                let currentTwr =
                    (stageStat.individual.totalThrust * 1000) /
                    (currentMass * GRAVITY_SOURCE.EARTH);

                if (currentMass < stageStat.stacked.dryMass) {
                    currentMass = stageStat.stacked.dryMass;
                    currentTwr = 0;
                }

                const drag = calculateDrag(largestSection, velocity, altitude);
                const gravityForce = calculateGravitationalForce(
                    currentMass,
                    altitude
                );
                const thrust = stageStat.individual.totalThrust * 1000;

                const netForce = thrust - drag - gravityForce;
                const acceleration = netForce / currentMass;

                velocity += acceleration * TIMESTEP;
                altitude +=
                    velocity * TIMESTEP +
                    0.5 * acceleration * Math.pow(TIMESTEP, 2);

                flightRecords.push({
                    stageId: stageStat.stageId,

                    timeElapsed: second + prevSecond,
                    twr: currentTwr,
                    mass: currentMass,
                    velocity: velocity,
                    altitude: altitude,
                    drag: drag,
                    gravityForce: gravityForce,
                });
            }
            prevSecond += stageStat.stacked.burnTime;
        }

        return { records: flightRecords };
    };

    enum oriantation {
        VERTICAL,
        TURNING,
        EASTWARD,
    }
    const LAUNCH_LAT = 28.608389; // Launch latitude
    const LAUNCH_LNG = -80.604333; // Launch longitude

    const TURN_START_ALT = 7000; // Altitude where turn starts, in meters
    const TURN_END_ALT = TURN_START_ALT + 120000; // Example altitude where the turn ends, in meters
    const TURN_RATE = Math.PI / 2 / (TURN_END_ALT - TURN_START_ALT); // Rate of the turn, radians per meter

    const TIMESTEP = 1;
    const EARTH_RADIUS = 6371000; // Average radius of Earth, in meters
    const COLORS = ["red", "blue", "green", "yellow", "gray"];

    const simulateTrajectory = (): Trajectory[] => {
        let turn = oriantation.VERTICAL;

        let trajectories: Trajectory[] = [];
        let trajIndex = 0;

        let prevSecond = 0;

        let altitude = 0;
        let east = 0;

        let verticalVelocity = 0;
        let eastVelocity = 0;

        for (let stageStat of stageStats) {
            let stageTraj: Trajectory = {
                stageId: stageStat.stageId,
                points: [],
                label: `stage: ${trajIndex + 1}`,
                pathColor: COLORS[trajIndex],
                pathStroke: "2px",
            };

            if (!trajIndex && !stageTraj.points.length) {
                //add starting point (launchpad)
                stageTraj.points.push({
                    lat: LAUNCH_LAT,
                    lng: LAUNCH_LNG,
                    alt: 0,
                });
            }

            for (
                let second = 0;
                second <= stageStat.stacked.burnTime;
                second += TIMESTEP
            ) {
                let currentMass =
                    stageStat.stacked.totalMass -
                    stageStat.individual.totalMassFlowRate * second;

                const drag = calculateDrag(
                    largestSection,
                    verticalVelocity + eastVelocity,
                    altitude
                );
                const gravityForce = calculateGravitationalForce(
                    currentMass,
                    altitude
                );

                let thrust = stageStat.individual.totalThrust * 1000;
                if (currentMass <= stageStat.stacked.dryMass) {
                    thrust *= 0;
                    currentMass = stageStat.stacked.dryMass;
                }

                const netForce = thrust - drag - gravityForce;
                const acceleration = netForce / currentMass;

                // Turning logic
                let eastStep = 0;
                let altitudeStep = 0;
                if (
                    turn === oriantation.VERTICAL &&
                    altitude > TURN_START_ALT
                ) {
                    turn = oriantation.TURNING;
                }

                if (turn === oriantation.VERTICAL) {
                    verticalVelocity += acceleration * TIMESTEP;
                    altitudeStep =
                        verticalVelocity * TIMESTEP +
                        0.5 * acceleration * Math.pow(TIMESTEP, 2);
                } else if (turn === oriantation.TURNING) {
                    //turn logic here
                    // Calculate the turn angle based on the current altitude
                    let turnAngle =
                        Math.max(0, altitude - TURN_START_ALT) * TURN_RATE;
                    turnAngle = Math.min(turnAngle, Math.PI / 2); // Clamp the angle to a maximum of 90 degrees (PI/2 radians)

                    // Calculate the proportion of the force that goes into the eastward and vertical components
                    let eastwardForceProportion = Math.sin(turnAngle);
                    let verticalForceProportion = Math.cos(turnAngle);

                    // Calculate the net forces for each direction
                    let verticalNetForce =
                        thrust * verticalForceProportion -
                        gravityForce -
                        drag * verticalForceProportion;
                    let eastwardNetForce =
                        thrust * eastwardForceProportion -
                        drag * eastwardForceProportion;

                    // Calculate the accelerations for each direction
                    let verticalAcceleration = verticalNetForce / currentMass;
                    let eastwardAcceleration = eastwardNetForce / currentMass;

                    // Calculate the new velocities and steps
                    verticalVelocity += verticalAcceleration * TIMESTEP;
                    eastVelocity += eastwardAcceleration * TIMESTEP;

                    altitudeStep =
                        verticalVelocity * TIMESTEP +
                        0.5 * verticalAcceleration * Math.pow(TIMESTEP, 2);
                    eastStep =
                        eastVelocity * TIMESTEP +
                        0.5 * eastwardAcceleration * Math.pow(TIMESTEP, 2);

                    // Check if the turn is complete
                    if (altitude >= TURN_END_ALT) {
                        turn = oriantation.EASTWARD;
                    }
                } else if (turn === oriantation.EASTWARD) {
                    let eastwardNetForce = thrust - drag;

                    // Acceleration in the eastward direction
                    let eastwardAcceleration = eastwardNetForce / currentMass;

                    eastVelocity += eastwardAcceleration * TIMESTEP;
                    eastStep =
                        eastVelocity * TIMESTEP +
                        0.5 * eastwardAcceleration * Math.pow(TIMESTEP, 2);

                    verticalVelocity -= (gravityForce / currentMass) * TIMESTEP;
                    altitudeStep = verticalVelocity * TIMESTEP;
                }

                altitude += altitudeStep;
                east += eastStep;

                let point: Point = {
                    lat: LAUNCH_LAT,
                    lng:
                        LAUNCH_LNG +
                        eastStep / ((Math.PI * EARTH_RADIUS) / 180),
                    alt: altitude / EARTH_RADIUS,
                };

                stageTraj.points.push(point);
            }
            prevSecond += stageStat.stacked.burnTime;
            trajectories.push(stageTraj);
            trajIndex++;
        }

        return trajectories;
    };

    const trajectoryRK4 = (): Trajectory[] => {
        let trajectories: Trajectory[] = [];
        let trajIndex = 1;
        let prevSecond = 0;

        let state: Derivative = {
            altitude: 0,
            east: 0,
            eastVelocity: 0,
            verticalVelocity: 0,
            mass: 0,
        };

        for (let stageStat of stageStats) {
            //next stage so initilize with stage mass
            state.mass = stageStat.stacked.totalMass;
            let vars: rk4Vars = {
                thrust: stageStat.individual.totalThrust * 1000,
                massFlowRate: stageStat.individual.totalMassFlowRate,
                largestSection,
                TIMESTEP,
                TURN_START_ALT,
                TURN_END_ALT,
                TURN_RATE,
            };
            //init stage trajectory
            let stageTraj: Trajectory = {
                stageId: stageStat.stageId,
                points: [],
                label: `stage: ${trajIndex + 1}`,
                pathColor: COLORS[trajIndex],
                pathStroke: "2px",
            };

            for (
                let second = 0;
                second <= stageStat.stacked.burnTime;
                second += TIMESTEP
            ) {
                state = rk4(state, vars, prevSecond + second, TIMESTEP);

                let point: Point = {
                    lat: LAUNCH_LAT,
                    lng:
                        LAUNCH_LNG +
                        state.east / ((Math.PI * EARTH_RADIUS) / 180),
                    alt: state.altitude / EARTH_RADIUS,
                };

                stageTraj.points.push(point);
            }
            prevSecond += stageStat.stacked.burnTime;
            trajectories.push(stageTraj);
            trajIndex++;
        }

        //Coasting
        let second = 0;
        let coastingTraj: Trajectory = {
            stageId: "",
            points: [],
            label: `stage: ${trajIndex + 1}`,
            pathColor: "gray",
            pathStroke: "1px",
        };
        while (state.altitude > 0 || second > 60 * 5) {
            let vars: rk4Vars = {
                thrust: 0,
                massFlowRate: 0,
                largestSection,
                TIMESTEP,
                TURN_START_ALT,
                TURN_END_ALT,
                TURN_RATE,
            };
            state = rk4(state, vars, prevSecond + second, TIMESTEP);

            let point: Point = {
                lat: LAUNCH_LAT,
                lng: LAUNCH_LNG + state.east / ((Math.PI * EARTH_RADIUS) / 180),
                alt: state.altitude / EARTH_RADIUS,
            };
            coastingTraj.points.push(point);

            second++;
        }
        trajectories.push(coastingTraj);

        return trajectories;
    };

    return {
        largestSection,
        stageStats,
        getFlightData,
        simulateTrajectory,
        trajectoryRK4,
    };
}
