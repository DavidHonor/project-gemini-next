import { Rocket } from "@/types/rocket";
import type { RocketPart } from "@prisma/client";
import Image from "next/image";
import React, { useRef } from "react";
import RocketPartComp from "./RocketPartComp";
import { Circle, Loader2 } from "lucide-react";

interface RocketCanvasProps {
    rocket: Rocket;
}

const RocketCanvas = ({ rocket }: RocketCanvasProps) => {
    const ref = useRef<HTMLDivElement>(null);

    if (!rocket || !rocket.stages)
        return <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />;

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
        </div>
    );
};

export default RocketCanvas;
