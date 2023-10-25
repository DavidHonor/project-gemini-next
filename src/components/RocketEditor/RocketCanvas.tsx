import { Rocket } from "@/types/rocket";
import { RocketPart } from "../../../prisma/generated/zod";

import React, { useContext, useRef } from "react";
import RocketPartComp from "./RocketPartComp";
import { Grab, Loader2, MousePointerSquareDashed } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { RocketContext } from "./RocketContext";
import { CursorOptions, cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

import ControlledSlider from "../ControlledSlider/ControlledSlider";

interface RocketCanvasProps {
    rocket: Rocket;
}

const RocketCanvas = ({ rocket }: RocketCanvasProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const { setCursorMode, cursorMode, saveRocketScale } =
        useContext(RocketContext);

    if (!rocket || !rocket.stages)
        return (
            <div className="flex items-center justify-center h-20">
                <p className="text-zinc-700 font-semibold sm:text-lg">
                    Loading rocket
                </p>
                <Loader2 className="ml-1 h-8 w-8 animate-spin text-zinc-800" />
            </div>
        );

    return (
        <div ref={ref} className="h-full w-full relative">
            {rocket.stages.flatMap((stage, index) => {
                return stage.parts.map((part: RocketPart) => {
                    return (
                        <RocketPartComp
                            key={"rp_" + part?.id}
                            rocketPart={part}
                            forwardedRef={ref}
                        />
                    );
                });
            })}

            <div className="absolute flex left-1 top-1 z-50 gap-1">
                <Card
                    className={cn(
                        "flex items-center justify-center hover:cursor-pointer",
                        {
                            "bg-zinc-300": cursorMode === CursorOptions.GRAB,
                        }
                    )}
                >
                    <CardContent
                        className="p-2"
                        onClick={() => setCursorMode(CursorOptions.GRAB)}
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Grab className="w-5 h-5" />
                                </TooltipTrigger>
                                <TooltipContent>Dragging mode</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardContent>
                </Card>

                <Card
                    className={cn(
                        "flex items-center justify-center hover:cursor-pointer",
                        {
                            "bg-zinc-300": cursorMode === CursorOptions.SELECT,
                        }
                    )}
                >
                    <CardContent
                        className="p-2"
                        onClick={() => setCursorMode(CursorOptions.SELECT)}
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <MousePointerSquareDashed className="w-5 h-5" />
                                </TooltipTrigger>
                                <TooltipContent>Select mode</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardContent>
                </Card>

                <Card className="flex items-center justify-center">
                    <CardContent className="flex flex-row p-1 w-[170px]">
                        <ControlledSlider
                            max={1.5}
                            min={0.3}
                            step={0.1}
                            value={rocket.scaleSlider}
                            onValueCommit={(values) => {
                                saveRocketScale(values[0]);
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RocketCanvas;
