import { FlightData, FlightRecord } from "@/types/rocket_stats";
import React, { useContext } from "react";

import { AxisOptions, Chart } from "react-charts";
import { RocketContext } from "../RocketEditor/RocketContext";

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

    const findStageNmb = (stageId: string): number => {
        if (!rocket) throw new Error("Chart, no rocket");
        const result = rocket.stages.findIndex((x) => x.id === stageId);
        if (result === -1) throw new Error("Chart, stage not found");
        return result + 1;
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

        if (selectedChart === "twrOverTime") {
            // Map each stage group to a series for the chart
            return Object.entries(groupedByStageId).map(
                ([stageId, records]) => ({
                    label: `TWR - Stage ${findStageNmb(stageId)}`,
                    data: records.map((record) => ({
                        primary: record.timeElapsed,
                        secondary: record.twr,
                    })),
                })
            );
        } else if (selectedChart === "massOverTime") {
            // Map each stage group to a series for the chart
            return Object.entries(groupedByStageId).map(
                ([stageId, records]) => ({
                    label: `Mass - Stage ${findStageNmb(stageId)}`,
                    data: records.map((record) => ({
                        primary: record.timeElapsed,
                        secondary: record.mass,
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
    );
};

export default LineChart;
