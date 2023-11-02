import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Combine, Hammer } from "lucide-react";
import { EditorMenuOptions, cn } from "@/lib/utils";
import RocketPartsList from "../RocketPartList/RocketPartsList";
import RocketStages from "../RocketEditor/RocketStages";
import { RocketContext } from "../RocketEditor/RocketContext";

const RocketEditorMenu = () => {
    const { menuOption, setMenuOption } = useContext(RocketContext);

    return (
        <>
            <div className="flex items-center gap-0.5 mt-1">
                <Button
                    variant={"outline"}
                    className={cn("", {
                        "bg-zinc-300": menuOption === EditorMenuOptions.PARTS,
                    })}
                    onClick={() => setMenuOption(EditorMenuOptions.PARTS)}
                >
                    <span className="text-xs lg:text-base">Parts</span>
                    <Hammer className="h-5 w-5 ml-1" />
                </Button>
                <Button
                    variant={"outline"}
                    className={cn("", {
                        "bg-zinc-300": menuOption === EditorMenuOptions.STAGES,
                    })}
                    onClick={() => setMenuOption(EditorMenuOptions.STAGES)}
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
        </>
    );
};

export default RocketEditorMenu;
