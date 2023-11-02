import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Combine, Gauge, Hammer } from "lucide-react";
import { EditorMenuOptions, cn } from "@/lib/utils";
import RocketPartsList from "../RocketPartList/RocketPartsList";
import RocketStages from "../RocketEditor/RocketStages";
import { RocketContext } from "../RocketEditor/RocketContext";
import RocketPerformance from "../RocketPerformance/RocketPerformance";

const RocketEditorMenu = () => {
    const { menuOption, setMenuOption } = useContext(RocketContext);

    return (
        <>
            <div className="flex items-center gap-1 lg:gap-2 mt-1 pb-1 overflow-y-auto">
                <Button
                    variant={"outline"}
                    className={cn("p-1", {
                        "bg-zinc-300": menuOption === EditorMenuOptions.PARTS,
                    })}
                    onClick={() => setMenuOption(EditorMenuOptions.PARTS)}
                >
                    <span className="text-xs xl:text-base">Parts</span>
                    <Hammer className="hidden lg:block h-4 w-4 xl:h-5 xl:w-5 ml-1" />
                </Button>
                <Button
                    variant={"outline"}
                    className={cn("p-1", {
                        "bg-zinc-300": menuOption === EditorMenuOptions.STAGES,
                    })}
                    onClick={() => setMenuOption(EditorMenuOptions.STAGES)}
                >
                    <span className="text-xs xl:text-base">Stages</span>
                    <Combine className="hidden lg:block h-4 w-4 xl:h-5 xl:w-5 ml-1" />
                </Button>
                <Button
                    variant={"outline"}
                    className={cn("p-1", {
                        "bg-zinc-300":
                            menuOption === EditorMenuOptions.PERFORMANCE,
                    })}
                    onClick={() => setMenuOption(EditorMenuOptions.PERFORMANCE)}
                >
                    <span className="text-xs xl:text-base">Performance</span>
                    <Gauge className="hidden lg:block h-4 w-4 xl:h-5 xl:w-5 ml-1" />
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
                        "absolute inset-y-0 left-0 w-full h-full transition-all duration-300 overflow-y-auto",
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

                <div
                    className={cn(
                        "absolute inset-y-0 left-0 w-full h-full transition-all duration-300 overflow-y-auto",
                        {
                            "translate-x-0 opacity-100":
                                menuOption === EditorMenuOptions.PERFORMANCE,
                            "translate-x-full opacity-0 pointer-events-none -z-10":
                                menuOption !== EditorMenuOptions.PERFORMANCE,
                        }
                    )}
                >
                    <RocketPerformance />
                </div>
            </div>
        </>
    );
};

export default RocketEditorMenu;
