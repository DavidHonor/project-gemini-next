import React, { useContext } from "react";
import { RocketContext } from "../RocketEditor/RocketContext";
import { Separator } from "../ui/separator";

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
                    <div className="flex justify-between py-3">
                        <span>{`Stage ${index + 1}`}</span>
                        <p>ind: {stageStat.individual.deltaV}m/s</p>
                        <p>stacked: {stageStat.stacked.deltaV}m/s</p>
                    </div>
                    <Separator />
                </div>
            ))}
        </div>
    );
};

export default RocketPerformance;
