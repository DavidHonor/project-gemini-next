import React, { useContext } from "react";
import { RocketContext } from "../RocketEditor/RocketContext";
import { Separator } from "../ui/separator";
import { roundToDecimalPlaces } from "@/lib/utils";
import { GRAVITY_SOURCE } from "@/config/rocket_parts";

const RocketPerformance = () => {
    const { stats } = useContext(RocketContext);
    if (!stats) return "";

    return (
        <div className="flex flex-col">
            {stats.stageStats.map((stageStat, index) => (
                <div
                    className="flex flex-col"
                    key={"stat_" + stageStat.stageId}
                >
                    <div className="flex flex-col py-3">
                        <h2 className="text-base font-medium">
                            Stage {index + 1}
                        </h2>

                        <div className="flex gap-1 mb-1">
                            <span className="flex-1"></span>
                            <span className="flex-1 text-xs font-medium">
                                Individual
                            </span>
                            <span className="flex-1 text-xs font-medium">
                                Stacked
                            </span>
                        </div>

                        <div className="flex gap-1">
                            <span className="flex-1 text-xs font-medium">
                                DeltaV
                            </span>
                            <span className="flex-1 text-xs">
                                {stageStat.individual.deltaV}m/s
                            </span>
                            <span className="flex-1 text-xs">
                                {stageStat.stacked.deltaV}m/s
                            </span>
                        </div>

                        <div className="flex gap-1">
                            <span className="flex-1 text-xs font-medium">
                                Thrust
                            </span>
                            <span className="flex-1 text-xs">
                                {stageStat.individual.totalThrust} kN
                            </span>
                            <span className="flex-1 text-xs">-</span>
                        </div>

                        <div className="flex gap-1">
                            <span className="flex-1 text-xs font-medium">
                                Mass flow rate
                            </span>
                            <span className="flex-1 text-xs">
                                {stageStat.individual.totalMassFlowRate} kg/s
                            </span>
                            <span className="flex-1 text-xs">-</span>
                        </div>

                        <div className="flex gap-1">
                            <span className="flex-1 text-xs font-medium">
                                Burn time
                            </span>
                            <span className="flex-1 text-xs">
                                {stageStat.individual.burnTime}s
                            </span>
                            <span className="flex-1 text-xs">
                                {stageStat.stacked.burnTime}s
                            </span>
                        </div>

                        <div className="flex gap-1 mt-2">
                            <span className="flex-1 text-xs font-medium">
                                Empty mass
                            </span>
                            <span className="flex-1 text-xs">
                                {roundToDecimalPlaces(
                                    stageStat.individual.dryMass
                                ).toLocaleString() + " kg"}
                            </span>
                            <span className="flex-1 text-xs">
                                {roundToDecimalPlaces(
                                    stageStat.stacked.dryMass
                                ).toLocaleString() + " kg"}
                            </span>
                        </div>

                        <div className="flex gap-1">
                            <span className="flex-1 text-xs font-medium">
                                Fuel mass
                            </span>
                            <span className="flex-1 text-xs">
                                {roundToDecimalPlaces(
                                    stageStat.individual.totalMass -
                                        stageStat.individual.dryMass
                                ).toLocaleString() + " kg"}
                            </span>
                            <span className="flex-1 text-xs">
                                {roundToDecimalPlaces(
                                    stageStat.stacked.totalMass -
                                        stageStat.stacked.dryMass
                                ).toLocaleString() + " kg"}
                            </span>
                        </div>

                        <div className="flex gap-1">
                            <span className="flex-1 text-xs font-medium">
                                Total mass
                            </span>
                            <span className="flex-1 text-xs">
                                {roundToDecimalPlaces(
                                    stageStat.individual.totalMass
                                ).toLocaleString() + " kg"}
                            </span>
                            <span className="flex-1 text-xs">
                                {roundToDecimalPlaces(
                                    stageStat.stacked.totalMass
                                ).toLocaleString() + " kg"}
                            </span>
                        </div>

                        <div className="flex gap-1">
                            <span className="flex-1 text-xs font-medium">
                                Twr
                            </span>
                            <span className="flex-1 text-xs">
                                {roundToDecimalPlaces(
                                    (stageStat.individual.totalThrust * 1000) /
                                        (stageStat.individual.totalMass *
                                            GRAVITY_SOURCE.EARTH),
                                    1
                                )}
                            </span>
                            <span className="flex-1 text-xs">
                                {roundToDecimalPlaces(
                                    (stageStat.stacked.totalThrust * 1000) /
                                        (stageStat.stacked.totalMass *
                                            GRAVITY_SOURCE.EARTH),
                                    1
                                )}
                            </span>
                        </div>
                    </div>
                    <Separator />
                </div>
            ))}
        </div>
    );
};

export default RocketPerformance;
