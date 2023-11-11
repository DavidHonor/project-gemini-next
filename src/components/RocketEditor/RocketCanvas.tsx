import { Rocket } from "@/types/rocket";
import { RocketPart } from "../../../prisma/generated/zod";

import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import RocketPartComp from "./RocketPartComp";
import { Grab, Loader2, MousePointerSquareDashed, XCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { RocketContext } from "./RocketContext";
import { CursorOptions, cn } from "@/lib/utils";

import ControlledSlider from "../ControlledSlider/ControlledSlider";

import { toPng } from "html-to-image";
import { Button } from "../ui/button";
import { rocketScaleChanged } from "@/lib/ship_functions";

interface RocketCanvasProps {
    rocket: Rocket;
}

const RocketCanvas = ({ rocket }: RocketCanvasProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const deleteAreaRef = useRef<HTMLDivElement>(null);

    const {
        setCursorMode,
        cursorMode,
        updateRocketScale,
        uploadRocketPreview,
    } = useContext(RocketContext);

    const captureRocketImage = async () => {
        if (!ref || !ref.current) return;

        const dataUrl = await toPng(ref.current, { cacheBust: true });
        return dataUrl;
    };

    const uploadRocketImage = async () => {
        const img = await captureRocketImage();
        if (img && img.includes("data:image/png;base64"))
            uploadRocketPreview(img);
    };

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
                {rocket.stages.flatMap((stage) => {
                    return stage.parts.map((part: RocketPart) => {
                        return (
                            <RocketPartComp
                                key={"rocketPart_" + part.id}
                                rocketPart={part}
                                editorAreaRef={ref}
                                deleteAreaRef={deleteAreaRef}
                                rocket={rocket}
                            />
                        );
                    });
                })}
            </div>

            {/* Canvas related controls */}
            <div className="absolute flex left-1 top-1 z-30 gap-1">
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
                                updateRocketScale({
                                    scale: values[0],
                                    rocketUpdated: rocket,
                                    editorSize:
                                        ref!.current!.getBoundingClientRect(),
                                });
                            }}
                        />
                    </CardContent>
                </Card>
            </div>

            {/* delete parts area */}
            <div
                ref={deleteAreaRef}
                className="fixed bottom-0 left-0 right-0 h-16 pointer-events-none"
            />

            {/* animation for deleting parts */}
            <div
                className={cn(
                    "fixed flex items-center justify-center curve-effect bottom-0 left-0 right-0 h-16 pointer-events-none slide-in",
                    {
                        "slide-in-active": cursorMode === CursorOptions.GRAB,
                    }
                )}
            >
                <div className="flex z-10">
                    <XCircle className="text-red-600 h-8 w-8" />
                </div>
            </div>
        </div>
    );
};

export default RocketCanvas;
