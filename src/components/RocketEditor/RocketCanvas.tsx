import { Rocket } from "@/types/rocket";
import { RocketPart } from "../../../prisma/generated/zod";

import React, { useContext, useEffect, useRef } from "react";
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

import { toPng } from "html-to-image";
import { Button } from "../ui/button";

interface RocketCanvasProps {
    rocket: Rocket;
}

const RocketCanvas = ({ rocket }: RocketCanvasProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const {
        setCursorMode,
        cursorMode,
        updateRocketScale,
        uploadRocketPreview,
    } = useContext(RocketContext);

    const captureRocketImage = async () => {
        if (ref === null || ref.current === null) return;

        const dataUrl = await toPng(ref.current, { cacheBust: true });
        return dataUrl;
    };

    const onLoadCapture = async () => {
        const img = await captureRocketImage();
        if (img !== undefined && img.includes("data:image/png;base64"))
            uploadRocketPreview(img);
    };

    useEffect(() => {
        if (rocket && rocket.stages) onLoadCapture();
    }, []);

    if (!rocket || !rocket.stages)
        return (
            <div className="flex items-center justify-center h-20 w-full">
                <p className="text-zinc-700 font-semibold sm:text-base">
                    Loading rocket
                </p>
                <Loader2 className="ml-1 h-8 w-8 animate-spin text-zinc-800" />
            </div>
        );

    return (
        <div className="h-full w-full relative">
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
            </div>

            {/* Canvas related controls */}
            <div className="absolute flex left-1 top-1 z-50 gap-1">
                <Button
                    variant={"outline"}
                    className={cn("px-2", {
                        "bg-zinc-300": cursorMode === CursorOptions.GRAB,
                    })}
                    onClick={() => setCursorMode(CursorOptions.GRAB)}
                >
                    <Grab className="w-5 h-5" />
                </Button>

                <Button
                    variant={"outline"}
                    className={cn("px-2", {
                        "bg-zinc-300": cursorMode === CursorOptions.SELECT,
                    })}
                    onClick={() => setCursorMode(CursorOptions.SELECT)}
                >
                    <MousePointerSquareDashed className="w-5 h-5" />
                </Button>

                <Card className="flex items-center justify-center">
                    <CardContent className="flex flex-row p-1 w-[170px]">
                        <ControlledSlider
                            max={1.5}
                            min={0.3}
                            step={0.1}
                            value={rocket.scaleSlider}
                            onValueCommit={(values) => {
                                updateRocketScale(values[0]);
                            }}
                        />
                    </CardContent>
                </Card>

                <div className="flex">
                    <Button
                        className="h-full"
                        onClick={() => captureRocketImage()}
                    >
                        Capture
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RocketCanvas;
