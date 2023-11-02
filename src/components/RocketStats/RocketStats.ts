import {
    GRAVITY_SOURCE,
    PartTypes,
    RocketPartPrototypes,
} from "@/config/rocket_parts";
import { fuelMassCalc, getDeltaV } from "@/lib/ship_functions";
import { roundToDecimalPlaces } from "@/lib/utils";
import { Rocket } from "@/types/rocket";
import { RocketStats, StageStats } from "@/types/rocket_stats";

function initStageSummary(stageId: string) {
    return {
        stageId: stageId,

        individual: {
            totalWeight: 0,
            dryWeight: 0,

            totalThrust: 0,
            totalIsp: 0,

            deltaV: 0,
        },

        stacked: {
            totalWeight: 0,
            dryWeight: 0,

            totalThrust: 0,
            totalIsp: 0,

            deltaV: 0,
        },
    };
}

export function calculateRocketStats(rocket: Rocket): RocketStats {
    const stageStats = (() => {
        let results: StageStats[] = [];
        for (let stage of rocket.stages) {
            let stageSummary: StageStats = initStageSummary(stage.id);
            let ispThrustSum = 0;

            //====== Summerize stages individually ======
            //=== dryWeight, totalWeight, totalThrust ===
            for (let part of stage.parts) {
                stageSummary.individual.dryWeight += part.weight;
                stageSummary.stacked.dryWeight += part.weight;

                stageSummary.individual.totalWeight += part.weight;
                stageSummary.stacked.totalWeight += part.weight;

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

                    stageSummary.individual.totalWeight +=
                        fuelMassCalc(protPart);
                    stageSummary.stacked.totalWeight =
                        stageSummary.individual.totalWeight;
                }
            }

            //=== calculate individual stage deltaV ===
            if (stageSummary.individual.totalThrust !== 0) {
                stageSummary.individual.totalIsp =
                    ispThrustSum / stageSummary.individual.totalThrust;
                //stacked is the same
                stageSummary.stacked.totalIsp =
                    ispThrustSum / stageSummary.stacked.totalThrust;
            }

            stageSummary.individual.deltaV = getDeltaV(
                stageSummary.individual.totalWeight,
                stageSummary.individual.dryWeight,
                stageSummary.individual.totalIsp,
                GRAVITY_SOURCE.EARTH
            );

            results.push(stageSummary);
        }

        //=== Stacked stages performace ===
        //deltaV of the uppermost stacked stage is equal to the individual
        if (results.length) {
            results[results.length - 1].stacked.deltaV =
                results[results.length - 1].individual.deltaV;
        }
        for (let i = results.length - 1; i > 0; i--) {
            results[i - 1].stacked.dryWeight += results[i].stacked.dryWeight;

            results[i - 1].stacked.totalWeight +=
                results[i].stacked.totalWeight;

            results[i - 1].stacked.deltaV = getDeltaV(
                results[i - 1].stacked.totalWeight,
                results[i - 1].stacked.dryWeight,
                results[i - 1].stacked.totalIsp,
                GRAVITY_SOURCE.EARTH
            );
        }

        return results;
    })();

    const totalWeight = (() => {
        let weight = 0;
        for (let stage of rocket.stages) {
            for (let part of stage.parts) {
                weight += part.weight;
            }
        }
        return weight;
    })();

    const totalThrust = 0;
    const fuelCapacity = 0;

    return {
        totalWeight,
        totalThrust,
        fuelCapacity,
        stageStats,
    };
}
