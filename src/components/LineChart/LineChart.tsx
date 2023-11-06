import { FlightData, FlightRecord } from "@/types/rocket_stats";
import React, { useContext, useState } from "react";

import { AxisOptions, Chart } from "react-charts";
import { RocketContext } from "../RocketEditor/RocketContext";
import { cn } from "@/lib/utils";

type LineChartProps = {
    flightData: FlightData;
    selectedChart: string;
};
type ChartDataPoint = {
    primary: number;
    secondary: number;
};

const LineChart: React.FC<LineChartProps> = ({ flightData, selectedChart }) => {
    const { rocket } = useContext(RocketContext);
    const [description, setDesc] = useState("");

    const findStageNmb = (stageId: string): string => {
        if (!rocket) throw new Error("Chart, no rocket");

        const result = rocket.stages.findIndex((x) => x.id === stageId);
        if (result === -1) return "Coasting";

        return `Stage ${result + 1}`;
    };

    const data = React.useMemo(() => {
        // Shape of the grouped data
        type GroupedByStageId = {
            [key: string]: FlightRecord[];
        };

        const groupedByStageId = flightData.records.reduce<GroupedByStageId>(
            (acc, record) => {
                if (!acc[record.stageId]) {
                    acc[record.stageId] = [];
                }
                acc[record.stageId].push(record);
                return acc;
            },
            {}
        );

        setDesc("");
        if (selectedChart === "twrOverTime") {
            setDesc(
                "*Thrust to weight ratio of the rocket over time, as it burns propellant"
            );
            return Object.entries(groupedByStageId).map(
                ([stageId, records]) => ({
                    label: `TWR - ${findStageNmb(stageId)}`,
                    data: records.map((record) => ({
                        primary: record.timeElapsed,
                        secondary: record.twr,
                    })),
                })
            );
        } else if (selectedChart === "massOverTime") {
            return Object.entries(groupedByStageId).map(
                ([stageId, records]) => ({
                    label: `Mass - ${findStageNmb(stageId)}`,
                    data: records.map((record) => ({
                        primary: record.timeElapsed,
                        secondary: record.mass,
                    })),
                })
            );
        } else if (selectedChart === "altitudeOverTime") {
            return Object.entries(groupedByStageId).map(
                ([stageId, records]) => ({
                    label: `Altitude - ${findStageNmb(stageId)}`,
                    data: records.map((record) => ({
                        primary: record.timeElapsed,
                        secondary: record.altitude,
                    })),
                })
            );
        } else if (selectedChart === "altitudeOverDistance") {
            setDesc("*y-axis: altitude; x-axis: distance");
            return Object.entries(groupedByStageId).map(
                ([stageId, records]) => ({
                    label: `Altitude - ${findStageNmb(stageId)}`,
                    data: records.map((record) => ({
                        primary: record.east,
                        secondary: record.altitude,
                    })),
                })
            );
        } else if (selectedChart === "velocityOverTime") {
            return Object.entries(groupedByStageId).map(
                ([stageId, records]) => ({
                    label: `Velocity - ${findStageNmb(stageId)}`,
                    data: records.map((record) => ({
                        primary: record.timeElapsed,
                        secondary: record.velocity,
                    })),
                })
            );
        } else if (selectedChart === "dragOverTime") {
            return Object.entries(groupedByStageId).map(
                ([stageId, records]) => ({
                    label: `Drag - ${findStageNmb(stageId)}`,
                    data: records.map((record) => ({
                        primary: record.timeElapsed,
                        secondary: record.drag,
                    })),
                })
            );
        } else if (selectedChart === "dragOverAltitude") {
            return Object.entries(groupedByStageId).map(
                ([stageId, records]) => ({
                    label: `Drag - ${findStageNmb(stageId)}`,
                    data: records.map((record) => ({
                        primary: record.altitude,
                        secondary: record.drag,
                    })),
                })
            );
        } else if (selectedChart === "gravityForceOverAltitude") {
            setDesc(
                "*Force of gravitational force acting upon the rocket, as the mass and gravitational acceleration decreases with altitude"
            );
            return Object.entries(groupedByStageId).map(
                ([stageId, records]) => ({
                    label: `Gravity force - ${findStageNmb(stageId)}`,
                    data: records.map((record) => ({
                        primary: record.altitude,
                        secondary: record.gravityForce,
                    })),
                })
            );
        } else throw new Error("Provide a valid selectedChart prop");
    }, [flightData, selectedChart]);

    const primaryAxis = React.useMemo(
        () => ({
            getValue: (datum: ChartDataPoint) => datum.primary,
        }),
        []
    );

    const secondaryAxes = React.useMemo(
        () => [
            {
                getValue: (datum: ChartDataPoint) => datum.secondary,
            },
        ],
        []
    );

    return (
        <div className="flex flex-col">
            <div style={{ height: "300px" }}>
                <Chart
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes,
                        tooltip: true,
                    }}
                />
            </div>
            <span
                className={cn(
                    "text-xs mt-5 transition-opacity duration-300 opacity-0 ",
                    {
                        "opacity-100": description !== "",
                    }
                )}
            >
                {description}
            </span>
        </div>
    );
};

export default LineChart;
