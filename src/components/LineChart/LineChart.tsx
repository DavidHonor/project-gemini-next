import { FlightData } from "@/types/rocket_stats";
import React from "react";

import { AxisOptions, Chart } from "react-charts";

type LineChartProps = {
    flightData: FlightData;
    selectedChart: string;
};
type ChartDataPoint = {
    primary: number;
    secondary: number;
};

const LineChart: React.FC<LineChartProps> = ({ flightData, selectedChart }) => {
    const data = React.useMemo(() => {
        if (selectedChart === "twrOverTime")
            return [
                {
                    label: "TWR",
                    data: flightData.records.map((record) => ({
                        primary: record.timeElapsed,
                        secondary: record.twr,
                    })),
                },
            ];
        else if (selectedChart === "massOverTime")
            return [
                {
                    label: "Mass",
                    data: flightData.records.map((record) => ({
                        primary: record.timeElapsed,
                        secondary: record.mass,
                    })),
                },
            ];
        else throw new Error("Provide a selectedChart prop");
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
