import { PartTypes, RocketPartPrototypes } from "@/config/rocket_parts";
import { fuelMassCalc } from "@/lib/ship_functions";
import { Rocket } from "@/types/rocket"; // adjust the path
import { RocketStats, StageStats } from "@/types/rocket_stats";

export function calculateRocketStats(rocket: Rocket): RocketStats {
    const stageStats = (() => {
        let results: StageStats[] = [];
        for (let stage of rocket.stages) {
            let stageSummary: StageStats = {
                stageId: stage.id,
                totalWeight: 0,
                dryWeight: 0,
                totalThrust: 0,
            };

            for (let part of stage.parts) {
                stageSummary.dryWeight += part.weight;

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

                    stageSummary.totalThrust += protPart.thrust_sl;
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

                    stageSummary.totalWeight += fuelMassCalc(protPart);
                }
            }

            results.push(stageSummary);
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
