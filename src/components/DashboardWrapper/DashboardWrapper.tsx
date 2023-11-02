"use client";

import { Combine, Hammer, Loader2 } from "lucide-react";
import { RocketContext } from "../RocketEditor/RocketContext";
import React, { useContext, useEffect } from "react";
import RocketCanvas from "../RocketEditor/RocketCanvas";
import RocketPartsList from "../RocketPartList/RocketPartsList";
import { Button } from "../ui/button";
import { EditorMenuOptions, cn } from "@/lib/utils";
import RocketStages from "../RocketEditor/RocketStages";

const DashboardWrapper = ({ rocketId }: { rocketId: string }) => {
    const { rocket, getRocket, menuOption, setMenuOption } =
        useContext(RocketContext);

    useEffect(() => {
        getRocket(rocketId);
    }, []);

    return (
        <div className="flex w-full justify-center max-h-[calc(100vh-3.5rem)] overflow-hidden overscroll-none">
            {/* mobile layout */}
            <div className="md:hidden flex w-full h-[calc(100vh-3.5rem)]">
                <RocketCanvas rocket={rocket!} />
            </div>

            {/* desktop layout */}
            <div className="hidden md:flex w-full h-full">
                <div className="flex flex-col w-1/4 h-[calc(100vh-3.5rem)] ps-1 pe-1 border-r border-zinc-200">
                    <div className="flex items-center gap-0.5 mt-1">
                        <Button
                            variant={"outline"}
                            className={cn("", {
                                "bg-zinc-300":
                                    menuOption === EditorMenuOptions.PARTS,
                            })}
                            onClick={() =>
                                setMenuOption(EditorMenuOptions.PARTS)
                            }
                        >
                            <span className="text-xs lg:text-base">Parts</span>
                            <Hammer className="h-5 w-5 ml-1" />
                        </Button>
                        <Button
                            variant={"outline"}
                            className={cn("", {
                                "bg-zinc-300":
                                    menuOption === EditorMenuOptions.STAGES,
                            })}
                            onClick={() =>
                                setMenuOption(EditorMenuOptions.STAGES)
                            }
                        >
                            <span className="text-xs lg:text-base">Stages</span>
                            <Combine className="h-5 w-5 ml-1" />
                        </Button>
                    </div>

                    <div className="relative flex-grow overflow-hidden">
                        <div
                            className={cn(
                                "absolute inset-y-0 left-0 w-full transition-all duration-300",
                                {
                                    "translate-x-0 opacity-100":
                                        menuOption === EditorMenuOptions.PARTS,
                                    "-translate-x-full opacity-0 pointer-events-none -z-10":
                                        menuOption !== EditorMenuOptions.PARTS,
                                }
                            )}
                        >
                            <RocketPartsList />
                        </div>

                        <div
                            className={cn(
                                "absolute inset-y-0 left-0 w-full h-full transition-all duration-300 overflow-y-auto scrollbar-w-2 scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-thumb-rounded",
                                {
                                    "translate-x-0 opacity-100":
                                        menuOption === EditorMenuOptions.STAGES,
                                    "translate-x-full opacity-0 pointer-events-none -z-10":
                                        menuOption !== EditorMenuOptions.STAGES,
                                }
                            )}
                        >
                            <RocketStages />
                        </div>
                    </div>
                </div>

                <div className="w-[75%] h-[calc(100vh-3.5rem)]">
                    <RocketCanvas rocket={rocket!} />
                </div>
            </div>
        </div>
    );
};

export default DashboardWrapper;
