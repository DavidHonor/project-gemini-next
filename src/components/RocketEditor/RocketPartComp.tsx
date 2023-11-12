import { CursorOptions, cn, getEventCoords } from "@/lib/utils";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";

import type { RocketPart } from "@prisma/client";
import { RocketContext } from "./RocketContext";

import { Rocket } from "@/types/rocket";

interface RocketPartCompProps {
    rocketPart: RocketPart;
    setActivePart: (part: RocketPart | null) => void;
    editorAreaRef: React.RefObject<HTMLDivElement>;
    deleteAreaRef: React.RefObject<any>;
    rocket: Rocket;
}

const RocketPartComp = ({
    rocketPart,
    setActivePart,
    editorAreaRef,
    deleteAreaRef,
    rocket,
}: RocketPartCompProps) => {
    const {
        updatePartPosition,
        rocketPartIdDrag,
        highlightPartId,
        cursorMode,

        updatePartScale,
        deletePart,
        setRocketPartIdDrag,
    } = useContext(RocketContext);

    const [drag, setDrag] = useState({
        enabled: false,
        offset_x: 0,
        offset_y: 0,
    });

    const [partPosition, setPartPosition] = useState({
        left: rocketPart.x,
        top: rocketPart.y,
    });

    useEffect(() => {
        //simulate the drag start on the dynamically created part
        if (rocketPartIdDrag === rocketPart.id) {
            const offsetXPx =
                -(rocketPart.width * rocketPart.scale * rocket.scaleSlider) / 2;
            const offsetYPx =
                -(rocketPart.height * rocketPart.scale * rocket.scaleSlider) /
                2;
            setDrag({
                enabled: true,
                offset_x: offsetXPx,
                offset_y: offsetYPx,
            });
        }
    }, [rocketPartIdDrag]);

    useEffect(() => {
        setPartPosition({ left: rocketPart.x, top: rocketPart.y });
    }, [rocketPart.x, rocketPart.y]);

    useEffect(() => {
        //do not cancel the drag if a dynamic part is being dragged
        if (rocketPartIdDrag) return;

        setDrag({
            enabled: false,
            offset_x: 0,
            offset_y: 0,
        });
        setActivePart(null);
    }, [cursorMode]);

    useEffect(() => {
        if (drag.enabled) {
            window.addEventListener("mousemove", handlePartMove);
            window.addEventListener("touchmove", handlePartMove);

            window.addEventListener("mouseup", handlePartMoveEnd);
            window.addEventListener("touchend", handlePartMoveEnd);
        }
    }, [drag]);

    if (!rocketPart) return "";

    const handlePartMoveStart = (
        event:
            | React.MouseEvent<HTMLImageElement>
            | React.TouchEvent<HTMLImageElement>
    ) => {
        if (rocketPartIdDrag) return;
        const coords = getEventCoords(editorAreaRef, event);
        if (!coords) return;

        if (cursorMode === CursorOptions.GRAB) {
            setDrag({
                enabled: true,
                offset_x: rocketPart.x - coords.x,
                offset_y: rocketPart.y - coords.y,
            });
        } else if (cursorMode === CursorOptions.SELECT) {
            setActivePart(rocketPart);
            setDrag({
                enabled: !drag.enabled,
                offset_x: drag.enabled ? 0 : coords.x,
                offset_y: drag.enabled ? 0 : coords.y,
            });
        }
    };

    const handlePartMove = (event: MouseEvent | TouchEvent) => {
        if (cursorMode !== CursorOptions.GRAB) return;
        const coords = getEventCoords(editorAreaRef, event);
        if (!coords) throw new Error("handlePartMove no coords");

        setPartPosition({
            left: coords.x + drag.offset_x,
            top: coords.y + drag.offset_y,
        });
    };

    const handlePartMoveEnd = (event: MouseEvent | TouchEvent) => {
        if (cursorMode !== CursorOptions.GRAB) return;
        if (!deleteAreaRef.current) throw new Error("missing deleteAreaRef");
        const coords = getEventCoords(editorAreaRef, event, true);
        if (!coords) throw new Error("handlePartMoveEnd no coords");

        const deleteArea = deleteAreaRef.current.getBoundingClientRect();
        if (!deleteArea.y) return;

        //since the delete div is fixed positioned, the height of the top bar
        //has to be taken into count
        const topBarHeight = 56;
        const halfPartHeight =
            (rocketPart.height * rocket.scaleSlider * rocketPart.scale) / 2;

        if (
            deleteArea.y - topBarHeight <
            coords.y + drag.offset_y + halfPartHeight
        ) {
            deletePart(rocketPart);
            return;
        }

        updatePartPosition({
            ...rocketPart,
            x: coords.x + drag.offset_x,
            y: coords.y + drag.offset_y,
        });

        //Clear the dynamically returned dragging part id
        //to clear the blocking
        if (rocketPartIdDrag) setRocketPartIdDrag("");

        setDrag({
            enabled: false,
            offset_x: 0,
            offset_y: 0,
        });

        window.removeEventListener("mousemove", handlePartMove);
        window.removeEventListener("touchmove", handlePartMove);

        window.removeEventListener("mouseup", handlePartMoveEnd);
        window.removeEventListener("touchend", handlePartMoveEnd);
    };

    const Cursor = () => {
        if (cursorMode === CursorOptions.GRAB) {
            return drag.enabled ? "grabbing" : "grab";
        }
        return "pointer";
    };

    if (!editorAreaRef.current) return "";

    return (
        <div
            style={{
                position: "absolute",
                top: `${partPosition.top}px`,
                left: `${partPosition.left}px`,
                cursor: Cursor(),
            }}
            className={cn(
                "hover:after:opacity-30 transition duration-300 ease-in-out after:absolute after:inset-0 after:bg-white after:content-[''] after:z-20 after:opacity-0 after:pointer-events-none",
                {
                    "after:opacity-30": rocketPart.id === highlightPartId,
                }
            )}
        >
            <Image
                key={`part_img_${rocketPart.id}`}
                alt={rocketPart.name}
                width={rocketPart.width * rocketPart.scale * rocket.scaleSlider}
                height={
                    rocketPart.height * rocketPart.scale * rocket.scaleSlider
                }
                src={`/rocket_parts/${rocketPart.image}`}
                draggable="false"
                onMouseDown={handlePartMoveStart}
                onTouchStart={handlePartMoveStart}
                className="z-10"
            />
        </div>
    );
};

export default RocketPartComp;
