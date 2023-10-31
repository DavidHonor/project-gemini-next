import { PartTypes, RocketPartPrototypes } from "@/config/rocket_parts";
import { fuelMassCalc } from "@/lib/ship_functions";
import { Rocket } from "@/types/rocket";
import { RocketStats, StageStats } from "@/types/rocket_stats";

export function calculateRocketStats(rocket: Rocket): RocketStats {
    const stageStats = (() => {
        let results: StageStats[] = [];
        for (let stage of rocket.stages) {
            let stageSummary: StageStats = {
                stageId: stage.id,

                individual: {
                    totalWeight: 0,
                    dryWeight: 0,
                    totalThrust: 0,
                },

                stacked: {
                    totalWeight: 0,
                    dryWeight: 0,
                    totalThrust: 0,
                },
            };

            //Summerize stages individually
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

            results.push(stageSummary);
        }

        //Summerize stages stacked
        for (let i = results.length - 1; i > 0; i--) {
            results[i - 1].stacked.dryWeight += results[i].stacked.dryWeight;

            results[i - 1].stacked.totalWeight +=
                results[i].stacked.totalWeight;

            results[i - 1].stacked.totalThrust +=
                results[i].stacked.totalThrust;
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
