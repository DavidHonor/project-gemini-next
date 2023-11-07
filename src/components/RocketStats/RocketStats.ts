import {
    EARTH_RADIUS,
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
    twr,
} from "@/lib/ship_functions";

import { Rocket } from "@/types/rocket";
import {
    FlightData,
    FlightRecord,
    Point,
    RK4TrajectorySimulation,
    RocketStats,
    SimulationResult,
    StageStats,
    Trajectory,
} from "@/types/rocket_stats";

import {
    calculateCircumferenceDistance,
    degreesToRadians,
    normalizeToSurface,
} from "@/lib/utils";

import { computeDestinationPoint } from "geolib";
import { RK4ConfigVars, State, rk4 } from "@/lib/rk4_trajectory";
import { calculateAltitude } from "@/lib/rk4_trajectory/modules/utils";

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
                        protPart.thrust_sl * 1000,
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
        return { records: flightRecords };
        // if (!stageStats) return { records: flightRecords };

        // let prevSecond = 0;

        // let state: Derivative = {
        //     altitude: 0,
        //     east: 0,
        //     eastVelocity: 0,
        //     verticalVelocity: 0,
        //     mass: 0,
        // };

        // for (let stageStat of stageStats) {
        //     //next stage so initilize with stage mass
        //     state.mass = stageStat.stacked.totalMass;
        //     let vars: rk4Vars = {
        //         thrust: stageStat.individual.totalThrust * 1000,
        //         massFlowRate: stageStat.individual.totalMassFlowRate,
        //         largestSection,
        //         TIMESTEP,
        //         TURN_START_ALT,
        //         TURN_END_ALT,
        //         TURN_RATE,
        //     };

        //     for (
        //         let second = 0;
        //         second <= stageStat.stacked.burnTime;
        //         second += TIMESTEP
        //     ) {
        //         state = rk4(state, vars, prevSecond + second, TIMESTEP);

        //         const velocity = Math.sqrt(
        //             state.verticalVelocity ** 2 + state.eastVelocity ** 2
        //         );
        //         flightRecords.push({
        //             stageId: stageStat.stageId,

        //             timeElapsed: second + prevSecond,
        //             twr: twr(stageStat.individual.totalThrust, state.mass),
        //             mass: state.mass,
        //             velocity: velocity,
        //             altitude: state.altitude,
        //             east: state.east,
        //             drag: calculateDrag(
        //                 largestSection,
        //                 velocity,
        //                 state.altitude
        //             ),
        //             gravityForce: calculateGravitationalForce(
        //                 state.mass,
        //                 state.altitude
        //             ),
        //         });
        //     }

        //     prevSecond += stageStat.stacked.burnTime;
        // }

        // //Coasting
        // let second = 0;
        // while (state.altitude > 0 && second < 60 * COASTING_MINUTES) {
        //     let vars: rk4Vars = {
        //         thrust: 0,
        //         massFlowRate: 0,
        //         largestSection,
        //         TIMESTEP,
        //         TURN_START_ALT,
        //         TURN_END_ALT,
        //         TURN_RATE,
        //     };
        //     state = rk4(state, vars, prevSecond + second, TIMESTEP);
        //     const velocity = Math.sqrt(
        //         state.verticalVelocity ** 2 + state.eastVelocity ** 2
        //     );
        //     flightRecords.push({
        //         stageId: "",

        //         timeElapsed: second + prevSecond,
        //         twr: 0,
        //         mass: state.mass,
        //         velocity: velocity,
        //         altitude: state.altitude,
        //         east: state.east,
        //         drag: calculateDrag(largestSection, velocity, state.altitude),
        //         gravityForce: calculateGravitationalForce(
        //             state.mass,
        //             state.altitude
        //         ),
        //     });
        //     second++;
        // }

        // return { records: flightRecords };
    };

    const LAUNCH_LAT = 28.608389;
    const LAUNCH_LNG = -80.604333;
    const HEADING = 90;

    const TURN_START_ALT = 10000;
    const TURN_END_ALT = 80000;
    const TURN_RATE = Math.PI / 2 / (TURN_END_ALT - TURN_START_ALT); // Rate of the turn, radians per meter

    const TIMESTEP = 1;
    const COLORS = ["red", "blue", "green", "yellow", "BlueViolet"];

    const COASTING_MINUTES = 15;

    const simulateTrajectory = (): Trajectory[] => {
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

                const velocityMagnitude = Math.sqrt(
                    verticalVelocity ** 2 + eastVelocity ** 2
                );

                const drag = calculateDrag(
                    largestSection,
                    velocityMagnitude,
                    altitude
                );

                const gravityForce = calculateGravitationalForce(
                    currentMass,
                    altitude
                );

                let thrust = stageStat.individual.totalThrust * 1000;
                if (currentMass <= stageStat.stacked.dryMass) {
                    thrust = 0;
                    currentMass = stageStat.stacked.dryMass;
                }

                let turnAngle = 0;
                if (altitude > TURN_START_ALT && altitude < TURN_END_ALT) {
                    turnAngle =
                        Math.max(0, altitude - TURN_START_ALT) * TURN_RATE;
                } else if (altitude > TURN_END_ALT) {
                    turnAngle = degreesToRadians(90);
                }

                // Calculate force components based on the turn angle
                const eastwardForceProportion =
                    turnAngle > 0 ? Math.sin(turnAngle) : 0;
                const verticalForceProportion =
                    turnAngle > 0 ? Math.cos(turnAngle) : 1;

                // Drag forces proportionally
                let verticalDrag = 0;
                let eastwardDrag = 0;
                if (velocityMagnitude !== 0) {
                    verticalDrag =
                        drag * (verticalVelocity / velocityMagnitude);
                    eastwardDrag = drag * (eastVelocity / velocityMagnitude);
                }

                //Calculate the net forces
                const verticalNetForce =
                    thrust * verticalForceProportion -
                    gravityForce -
                    verticalDrag;
                const eastwardNetForce =
                    thrust * eastwardForceProportion - eastwardDrag;

                // Calculate the accelerations for each direction
                let verticalAcceleration = verticalNetForce / currentMass;
                let eastwardAcceleration = eastwardNetForce / currentMass;

                let altitudeStep = 0;
                let eastStep = 0;
                altitudeStep =
                    verticalVelocity * TIMESTEP +
                    0.5 * verticalAcceleration * Math.pow(TIMESTEP, 2);
                eastStep =
                    eastVelocity * TIMESTEP +
                    0.5 * eastwardAcceleration * Math.pow(TIMESTEP, 2);

                altitude += altitudeStep;
                east += eastStep;

                // Calculate the new velocities
                verticalVelocity += verticalAcceleration * TIMESTEP;
                eastVelocity += eastwardAcceleration * TIMESTEP;

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

    const trajectoryRK4 = (): SimulationResult => {
        let trajectories: Trajectory[] = [];
        let flightData: FlightData = { records: [] };

        let trajIndex = 0;
        let prevSecond = 0;

        const launchPoint = { x: 0, y: EARTH_RADIUS };

        let state: State = {
            x: launchPoint.x,
            y: launchPoint.y,
            xVelocity: 0,
            yVelocity: 0,
            mass: 0,
        };

        for (let stageStat of stageStats) {
            const stageFiring = simulateStageThrusting(
                state,
                stageStat,
                launchPoint,
                prevSecond,
                trajIndex
            );

            trajectories.push(stageFiring.trajectory);
            flightData.records.push(...stageFiring.flightData.records);
            state = stageFiring.state;

            prevSecond += stageStat.stacked.burnTime;
            trajIndex++;
        }

        //Coasting
        const coasting = simulateCoastingTrajectory(
            state,
            launchPoint,
            prevSecond,
            60 * COASTING_MINUTES
        );

        trajectories.push(coasting.trajectory);
        flightData.records.push(...coasting.flightData.records);
        state = coasting.state;

        return { trajectories, flightData };
    };

    const simulateStageThrusting = (
        state: State,
        stageStat: StageStats,
        launchPoint: { x: number; y: number },
        prevSecond: number,
        stageIndex: number
    ): RK4TrajectorySimulation => {
        let stageTrajectory: Trajectory = {
            stageId: stageStat.stageId,
            points: [],
            label: `stage: ${stageIndex + 1}`,
            pathColor: COLORS[stageIndex],
            pathStroke: "2px",
        };

        let config: RK4ConfigVars = {
            thrustNewtons: stageStat.individual.totalThrust * 1000,
            massFlowRate: stageStat.individual.totalMassFlowRate,
            largestSection,
            turnStartAlt: TURN_START_ALT,
            turnEndAlt: TURN_END_ALT,
            turnRate: TURN_RATE,
        };

        let flightData: FlightData = { records: [] };

        state.mass = stageStat.stacked.totalMass;

        for (
            let second = 0;
            second <= stageStat.stacked.burnTime;
            second += TIMESTEP
        ) {
            state = rk4(state, config, prevSecond + second, TIMESTEP);

            recordFlightData(
                state,
                stageStat.stageId,
                launchPoint,
                prevSecond + second,
                stageStat
            );

            let point: Point = createTrajectoryPoint(state, launchPoint);
            flightData.records.push(
                recordFlightData(
                    state,
                    stageStat.stageId,
                    launchPoint,
                    prevSecond + second,
                    stageStat
                )
            );

            stageTrajectory.points.push(point);
        }

        return { trajectory: stageTrajectory, flightData, state };
    };

    const simulateCoastingTrajectory = (
        state: State,
        launchPoint: { x: number; y: number },
        prevSecond: number,
        coastSeconds: number
    ): RK4TrajectorySimulation => {
        let second = 0;

        let coastingTrajectory: Trajectory = {
            stageId: "",
            points: [],
            label: `Coasting`,
            pathColor: "gray",
            pathStroke: "1px",
        };

        let config: RK4ConfigVars = {
            thrustNewtons: 0,
            massFlowRate: 0,
            largestSection,
            turnStartAlt: TURN_START_ALT,
            turnEndAlt: TURN_END_ALT,
            turnRate: TURN_RATE,
        };

        let flightData: FlightData = { records: [] };

        while (calculateAltitude(state) > 0 && second < coastSeconds) {
            state = rk4(state, config, prevSecond + second, TIMESTEP);

            let point: Point = createTrajectoryPoint(state, launchPoint);

            coastingTrajectory.points.push(point);
            flightData.records.push(
                recordFlightData(state, "", launchPoint, prevSecond + second)
            );

            second++;
        }

        return { trajectory: coastingTrajectory, flightData, state };
    };

    const createTrajectoryPoint = (
        state: State,
        launchPoint: { x: number; y: number }
    ) => {
        const altitude = calculateAltitude(state);
        const normalizedPoint = normalizeToSurface(
            state.x,
            state.y,
            altitude,
            EARTH_RADIUS
        );
        const distance = calculateCircumferenceDistance(
            launchPoint,
            normalizedPoint,
            EARTH_RADIUS
        );

        const coords = computeDestinationPoint(
            { latitude: LAUNCH_LAT, longitude: LAUNCH_LNG },
            distance,
            HEADING
        );

        return {
            lat: coords.latitude,
            lng: coords.longitude,
            alt: altitude / EARTH_RADIUS,
        };
    };

    const recordFlightData = (
        state: State,
        stageId: string,
        launchPoint: { x: number; y: number },
        timeElapsed: number,
        stageStat?: StageStats
    ) => {
        const velocity = Math.sqrt(state.xVelocity ** 2 + state.yVelocity ** 2);

        const altitude = calculateAltitude(state);

        const normalizedPoint = normalizeToSurface(
            state.x,
            state.y,
            altitude,
            EARTH_RADIUS
        );

        const distance = calculateCircumferenceDistance(
            launchPoint,
            normalizedPoint,
            EARTH_RADIUS
        );

        return {
            stageId: stageId,

            timeElapsed,
            twr: stageId
                ? twr(stageStat!.individual.totalThrust, state.mass)
                : 0,
            mass: state.mass,
            velocity: velocity,
            altitude: altitude,
            east: distance,
            drag: calculateDrag(largestSection, velocity, altitude),
            gravityForce: calculateGravitationalForce(state.mass, altitude),
        };
    };

    return {
        stageStats,

        getFlightData,
        simulateTrajectory,
        trajectoryRK4,
    };
}
