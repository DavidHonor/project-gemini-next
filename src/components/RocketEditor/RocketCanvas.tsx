import { Rocket } from "@/types/rocket";
import type { RocketPart } from "@prisma/client";
import Image from "next/image";
import React, { useContext, useRef } from "react";
import RocketPartComp from "./RocketPartComp";
import { Circle, Grab, Loader2, MousePointerSquareDashed } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { RocketContext } from "./RocketContext";
import { CursorOptions, cn } from "@/lib/utils";

interface RocketCanvasProps {
    rocket: Rocket;
}

const RocketCanvas = ({ rocket }: RocketCanvasProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const { setCursorMode, cursorMode } = useContext(RocketContext);

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
            {rocket.stages.flatMap((stage) =>
                stage.parts.map((part: RocketPart) => {
                    return (
                        <RocketPartComp
                            key={"rp_" + part?.id}
                            rocketPart={part}
                            forwardedRef={ref}
                        />
                    );
                })
            )}

            <div className="absolute flex left-1 top-1 z-50 gap-1">
                <Card>
                    <CardContent
                        className={cn("p-2 hover:cursor-pointer", {
                            "bg-zinc-300": cursorMode === CursorOptions.GRAB,
                        })}
                        onClick={() => setCursorMode(CursorOptions.GRAB)}
                    >
                        <MousePointerSquareDashed className="w-5 h-5" />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent
                        className={cn("p-2 hover:cursor-pointer", {
                            "bg-zinc-300": cursorMode === CursorOptions.SELECT,
                        })}
                        onClick={() => setCursorMode(CursorOptions.SELECT)}
                    >
                        <Grab className="w-5 h-5" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RocketCanvas;
