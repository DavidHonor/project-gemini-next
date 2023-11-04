import {
    GRAVITY_SOURCE,
    PartTypes,
    RocketPartPrototypes,
} from "@/config/rocket_parts";
import {
    calculateDrag,
    calculateGravitationalForce,
    fuelMassCalc,
    getDeltaV,
    massFlowRate,
} from "@/lib/ship_functions";
import { roundToDecimalPlaces } from "@/lib/utils";
import { Rocket } from "@/types/rocket";
import {
    FlightData,
    FlightRecord,
    RocketStats,
    StageStats,
} from "@/types/rocket_stats";

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
                stageSummary.individual.burnTime = roundToDecimalPlaces(
                    totalFuelMass / stageSummary.individual.totalMassFlowRate
                );
            }

            results.push(stageSummary);
        }

        //=== Stacked stages performace ===
        //deltaV of the uppermost stacked stage is equal to the individual
        if (results.length) {
            results[results.length - 1].stacked.deltaV =
                results[results.length - 1].individual.deltaV;
            results[results.length - 1].stacked.burnTime = roundToDecimalPlaces(
                results[results.length - 1].individual.burnTime
            );
        }
        for (let i = results.length - 1; i > 0; i--) {
            results[i - 1].stacked.dryMass +=
                results[i].stacked.dryMass + results[i].stacked.totalMass;

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
            results[i - 1].stacked.burnTime = roundToDecimalPlaces(
                totalFuelMass / results[i - 1].individual.totalMassFlowRate,
                1
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
            prevSecond = stageStat.stacked.burnTime;
        }

        return { records: flightRecords };
    };

    return {
        largestSection,
        stageStats,
        getFlightData,
    };
}
