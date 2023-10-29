"use client";

import { Combine, Hammer, Loader2 } from "lucide-react";
import { RocketContext } from "../RocketEditor/RocketContext";
import React, { useContext, useEffect } from "react";
import RocketCanvas from "../RocketEditor/RocketCanvas";
import RocketPartsList from "../RocketEditor/RocketPartsList";
import { Button } from "../ui/button";
import { EditorMenuOptions, cn } from "@/lib/utils";

const DashboardWrapper = ({ rocketId }: { rocketId: string }) => {
    const { rocket, getRocket, menuOption, setMenuOption } =
        useContext(RocketContext);

    useEffect(() => {
        getRocket(rocketId);
    }, []);

    return (
        <div className="flex w-full justify-center max-h-[calc(100vh-3.5rem)] overflow-hidden">
            {/* mobile layout */}
            <div className="md:hidden flex w-full h-[calc(100vh-3.5rem)]">
                <RocketCanvas rocket={rocket!} />
            </div>

            {/* desktop layout */}
            <div className="hidden md:flex w-full h-full">
                <div className="flex flex-col w-1/4 h-[calc(100vh-3.5rem)] ps-2 pe-2 border-r border-zinc-200">
                    <div className="flex items-center gap-1 mt-5 mb-5">
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
                            <span className="text-base">Parts</span>
                            <Hammer className="text-base ml-1" />
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
                            <span className="text-base">Stages</span>
                            <Combine className="text-base ml-1" />
                        </Button>
                    </div>

                    <RocketPartsList />
                </div>
                <div className="w-[75%] h-[calc(100vh-3.5rem)]">
                    <RocketCanvas rocket={rocket!} />
                </div>
                {/* <div className="w-1/4 h-[calc(100vh-3.5rem)] border-l border-zinc-200"></div> */}
            </div>
        </div>
    );
};

export default DashboardWrapper;
