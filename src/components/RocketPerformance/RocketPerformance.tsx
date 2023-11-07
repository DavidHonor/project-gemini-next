import React, { useContext, useEffect, useState } from "react";
import { RocketContext } from "../RocketEditor/RocketContext";
import { Separator } from "../ui/separator";
import { roundToDecimalPlaces } from "@/lib/utils";
import { twr } from "@/lib/ship_functions";

import FlightPerformance from "./FlightPerformance/FlightPerformance";

import FlightPathWrapper from "../RocketFlightPath/FlightPathWrapper";
import { Input } from "../ui/input";
import { Checkbox } from "@nextui-org/react";
import { DefaultLaunchConfig } from "@/config/rocket_parts";

const RocketPerformance = () => {
    const { stats } = useContext(RocketContext);

    const [isDefault, setDefault] = useState(true);

    const [launchConfig, setLaunchConfig] = useState({
        ...DefaultLaunchConfig,
    });

    const defaultOptionChange = () => {
        setDefault((prev) => !prev);
        setLaunchConfig({
            ...DefaultLaunchConfig,
        });
    };

    if (!stats) return "";

    return (
        <div className="flex flex-col">
            <div className="flex flex-col max-h-[60vh] overflow-y-auto">
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
                                    {roundToDecimalPlaces(
                                        stageStat.individual.deltaV
                                    ) + " m/s"}
                                </span>
                                <span className="flex-1 text-xs">
                                    {roundToDecimalPlaces(
                                        stageStat.stacked.deltaV
                                    ) + " m/s"}
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
                                    {roundToDecimalPlaces(
                                        stageStat.individual.totalMassFlowRate,
                                        1
                                    ) + " kg/s"}
                                </span>
                                <span className="flex-1 text-xs">-</span>
                            </div>

                            <div className="flex gap-1">
                                <span className="flex-1 text-xs font-medium">
                                    Burn time
                                </span>
                                <span className="flex-1 text-xs">
                                    {roundToDecimalPlaces(
                                        stageStat.individual.burnTime,
                                        1
                                    ) + " s"}
                                </span>
                                <span className="flex-1 text-xs">
                                    {roundToDecimalPlaces(
                                        stageStat.stacked.burnTime,
                                        1
                                    ) + " s"}
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
                                        twr(
                                            stageStat.individual.totalThrust,
                                            stageStat.individual.totalMass
                                        ),
                                        1
                                    )}
                                </span>
                                <span className="flex-1 text-xs">
                                    {roundToDecimalPlaces(
                                        twr(
                                            stageStat.stacked.totalThrust,
                                            stageStat.stacked.totalMass
                                        ),
                                        1
                                    )}
                                </span>
                            </div>
                        </div>
                        <Separator />
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-1 px-2 mt-2">
                <div className="flex justify-end items-center gap-1 mb-2">
                    <span className="text-base font-medium">
                        Default values
                    </span>
                    <Checkbox
                        isSelected={isDefault}
                        onChange={defaultOptionChange}
                    />
                </div>

                <div className="flex items-center justify-end gap-2">
                    <span className="flex-1 text-xs font-medium">
                        Turn start altitude
                    </span>
                    <div className="flex-1 flex">
                        <Input
                            type="number"
                            placeholder="Turn start altitude"
                            disabled={isDefault}
                            value={launchConfig.TURN_START_ALT}
                            min={0}
                            max={launchConfig.TURN_END_ALT}
                            onChange={(e) =>
                                setLaunchConfig({
                                    ...launchConfig,
                                    TURN_START_ALT: e.target.valueAsNumber,
                                })
                            }
                        />
                    </div>

                    <span className="flex-1 text-xs font-medium">
                        Turn end altitude
                    </span>
                    <div className="flex-1 flex">
                        <Input
                            type="number"
                            placeholder="Turn end altitude"
                            disabled={isDefault}
                            value={launchConfig.TURN_END_ALT}
                            min={launchConfig.TURN_START_ALT}
                            onChange={(e) =>
                                setLaunchConfig({
                                    ...launchConfig,
                                    TURN_END_ALT: e.target.valueAsNumber,
                                })
                            }
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                    <span className="flex-1 text-xs font-medium">
                        Heading (in degrees)
                    </span>
                    <div className="flex-1 flex">
                        <Input
                            type="number"
                            placeholder="Heading (degrees)"
                            disabled={isDefault}
                            value={launchConfig.HEADING}
                            min={0}
                            max={360}
                            onChange={(e) =>
                                setLaunchConfig({
                                    ...launchConfig,
                                    HEADING: e.target.valueAsNumber,
                                })
                            }
                        />
                    </div>

                    <span className="flex-1 text-xs font-medium">
                        Simulation time (mins)
                    </span>
                    <div className="flex-1 flex">
                        <Input
                            type="number"
                            placeholder=" Simulation time (mins)"
                            disabled={isDefault}
                            value={launchConfig.COASTING_MINUTES}
                            min={0}
                            max={180}
                            onChange={(e) =>
                                setLaunchConfig({
                                    ...launchConfig,
                                    COASTING_MINUTES: e.target.valueAsNumber,
                                })
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-2 justify-center mt-3">
                <FlightPerformance
                    useDefaultConfig={isDefault}
                    launchConfig={launchConfig}
                />
                <FlightPathWrapper
                    useDefaultConfig={isDefault}
                    launchConfig={launchConfig}
                />
            </div>
        </div>
    );
};

export default RocketPerformance;
