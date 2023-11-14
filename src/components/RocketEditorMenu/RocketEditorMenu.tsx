import React, { useContext, useEffect } from "react";
import { Button } from "../ui/button";
import { Combine, Gauge, Hammer } from "lucide-react";
import { EditorMenuOptions, cn } from "@/lib/utils";
import RocketPartsList from "../RocketPartList/RocketPartsList";
import RocketStages from "../RocketStages/RocketStages";
import { RocketContext } from "../RocketEditor/RocketContext";
import RocketPerformance from "../RocketPerformance/RocketPerformance";

import { TutorialStatus, TutorialStep } from "@prisma/client";
import { useTutorial } from "../useTutorial";
import { trpc } from "@/app/_trpc/client";

const RocketEditorMenu = () => {
    const { menuOption, setMenuOption } = useContext(RocketContext);

    const { isActive, activeStep, fetchTutorial } = useTutorial({});

    const { mutate: completeTutorialStep, status } =
        trpc.user.completeTutorialStep.useMutation();

    const nextStep = (currentStep: TutorialStep) => {
        if (!isActive) return;

        completeTutorialStep({ currentStep });
    };

    useEffect(() => {
        if (status === "success") fetchTutorial();
    }, [status]);

    return (
        <>
            <div className="flex items-center gap-1 lg:gap-2 mt-1 pb-1 overflow-y-auto">
                <Button
                    variant={"outline"}
                    className={cn("p-1", {
                        "bg-zinc-300": menuOption === EditorMenuOptions.PARTS,
                        "animate-pulse-border border-2 rounded-md":
                            activeStep === TutorialStep.FIRSTPART,
                    })}
                    onClick={() => {
                        nextStep(TutorialStep.FIRSTPART);
                        setMenuOption(EditorMenuOptions.PARTS);
                    }}
                >
                    <span className="text-xs xl:text-base">Parts</span>
                    <Hammer className="hidden lg:block h-4 w-4 xl:h-5 xl:w-5 ml-1" />
                </Button>
                <Button
                    variant={"outline"}
                    className={cn("p-1", {
                        "bg-zinc-300": menuOption === EditorMenuOptions.STAGES,
                        "animate-pulse-border border-2 rounded-md":
                            activeStep === TutorialStep.STAGES,
                    })}
                    onClick={() => {
                        nextStep(TutorialStep.STAGES);
                        setMenuOption(EditorMenuOptions.STAGES);
                    }}
                >
                    <span className="text-xs xl:text-base">Stages</span>
                    <Combine className="hidden lg:block h-4 w-4 xl:h-5 xl:w-5 ml-1" />
                </Button>
                <Button
                    variant={"outline"}
                    className={cn("p-1", {
                        "bg-zinc-300":
                            menuOption === EditorMenuOptions.PERFORMANCE,
                        "animate-pulse-border border-2 rounded-md":
                            activeStep === TutorialStep.PERFORMANCE,
                    })}
                    onClick={() => {
                        nextStep(TutorialStep.PERFORMANCE);
                        setMenuOption(EditorMenuOptions.PERFORMANCE);
                    }}
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
