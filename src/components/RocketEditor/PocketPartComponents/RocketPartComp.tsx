import { CursorOptions, cn, getEventCoords } from "@/lib/utils";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";

import type { RocketPart } from "@prisma/client";
import { RocketContext } from "../RocketContext";

import { Rocket } from "@/types/rocket";
import { useDraggable } from "./Draggable";

interface RocketPartCompProps {
    rocketPart: RocketPart;
    setActivePart: (part: RocketPart | null) => void;
    editorAreaRef: React.RefObject<HTMLDivElement>;
    deleteAreaRef: React.RefObject<HTMLDivElement>;
    rocket: Rocket;
}

const RocketPartComp = ({
    rocketPart,
    setActivePart,
    editorAreaRef,
    deleteAreaRef,
    rocket,
}: RocketPartCompProps) => {
    const { highlightPartId, cursorMode } = useContext(RocketContext);

    const [partPosition, setPartPosition] = useState({
        left: rocketPart.x,
        top: rocketPart.y,
    });

    useEffect(() => {
        setPartPosition({ left: rocketPart.x, top: rocketPart.y });
    }, [rocketPart.x, rocketPart.y]);

    const { drag, handlePartMoveStart } = useDraggable({
        rocketPart,
        editorAreaRef,
        deleteAreaRef,
        setActivePart,
        setPartPosition,
    });

    if (!rocketPart) return "";

    const Cursor = () => {
        if (cursorMode === CursorOptions.GRAB) {
            return drag.current.enabled ? "grabbing" : "grab";
        }
        return "pointer";
    };

    return (
        <Image
            data-testid={`part-rocket-${rocketPart.id}`}
            alt={rocketPart.name}
            width={rocketPart.width * rocketPart.scale * rocket.scaleSlider}
            height={rocketPart.height * rocketPart.scale * rocket.scaleSlider}
            src={`/rocket_parts/${rocketPart.image}`}
            draggable="false"
            onMouseDown={handlePartMoveStart}
            onTouchStart={handlePartMoveStart}
            style={{
                position: "absolute",
                top: `${partPosition.top}px`,
                left: `${partPosition.left}px`,
                cursor: Cursor(),
            }}
            className={cn(
                `z-10 hover:z-20 hover:border-blue-500 hover:border-2 select-none`,
                {
                    "border-2 z-20 border-blue-500":
                        rocketPart.id === highlightPartId,
                }
            )}
        />
    );
};

export default RocketPartComp;
