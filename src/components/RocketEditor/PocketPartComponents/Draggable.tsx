import { useContext, useEffect, useRef, useState } from "react";
import type { RocketPart } from "@prisma/client";
import { CursorOptions, debounce, getEventCoords } from "@/lib/utils";
import { RocketContext } from "../RocketContext";

interface useDraggable {
    rocketPart: RocketPart;
    editorAreaRef: React.RefObject<HTMLDivElement>;
    deleteAreaRef: React.RefObject<HTMLDivElement>;
    setActivePart: (part: RocketPart | null) => void;
    setPartPosition: ({ left, top }: { left: number; top: number }) => void;
}

export const useDraggable = ({
    rocketPart,
    editorAreaRef,
    deleteAreaRef,
    setActivePart,
    setPartPosition,
}: useDraggable) => {
    const {
        cursorMode,
        rocketPartIdDrag,
        rocket,
        deleteAreaActive,
        deletePart,
        updatePartPosition,
        setRocketPartIdDrag,
        setDeleteActive,
    } = useContext(RocketContext);

    const drag = useRef({
        enabled: false,
        offset_x: 0,
        offset_y: 0,
    });

    useEffect(() => {
        window.addEventListener("mousemove", handlePartMove);
        window.addEventListener("touchmove", handlePartMove);
        window.addEventListener("mouseup", handlePartMoveEnd);
        window.addEventListener("touchend", handlePartMoveEnd);

        return () => {
            window.removeEventListener("mousemove", handlePartMove);
            window.removeEventListener("touchmove", handlePartMove);
            window.removeEventListener("mouseup", handlePartMoveEnd);
            window.removeEventListener("touchend", handlePartMoveEnd);
        };
    }, []);

    useEffect(() => {
        //simulate the drag start on the dynamically created part
        if (rocketPartIdDrag === rocketPart.id && rocket) {
            const offsetXPx =
                -(rocketPart.width * rocketPart.scale * rocket.scaleSlider) / 2;
            const offsetYPx =
                -(rocketPart.height * rocketPart.scale * rocket.scaleSlider) /
                2;
            drag.current = {
                enabled: true,
                offset_x: offsetXPx,
                offset_y: offsetYPx,
            };
        }
    }, [rocketPartIdDrag]);

    useEffect(() => {
        //do not cancel the drag if a dynamic part is being dragged
        if (rocketPartIdDrag) return;

        drag.current = {
            enabled: false,
            offset_x: 0,
            offset_y: 0,
        };
        setActivePart(null);
    }, [cursorMode]);

    const handlePartMoveStart = (
        event:
            | React.MouseEvent<HTMLImageElement>
            | React.TouchEvent<HTMLImageElement>
    ) => {
        if (rocketPartIdDrag) return;
        const coords = getEventCoords(editorAreaRef, event);
        if (!coords) return;

        if (cursorMode === CursorOptions.GRAB && coords.button !== 2) {
            drag.current = {
                enabled: true,
                offset_x: rocketPart.x - coords.x,
                offset_y: rocketPart.y - coords.y,
            };
            setDeleteActive(true);
            setActivePart(null);
        } else if (coords.button === 2 || cursorMode === CursorOptions.SELECT) {
            setActivePart(rocketPart);
        }
    };

    const handlePartMove = (event: MouseEvent | TouchEvent) => {
        if (!drag.current.enabled) return;
        if (cursorMode !== CursorOptions.GRAB) return;
        const coords = getEventCoords(editorAreaRef, event);
        if (!coords) throw new Error("handlePartMove no coords");

        if (coords.button === 2) return;

        setPartPosition({
            left: coords.x + drag.current.offset_x,
            top: coords.y + drag.current.offset_y,
        });
    };

    const handlePartMoveEnd = (event: MouseEvent | TouchEvent) => {
        if (!drag.current.enabled) return;
        if (!rocket) return;
        if (cursorMode !== CursorOptions.GRAB) return;
        if (!deleteAreaRef.current) return;

        const coords = getEventCoords(editorAreaRef, event, true);
        if (!coords) throw new Error("handlePartMoveEnd no coords");

        const deleteArea = deleteAreaRef.current.getBoundingClientRect();
        if (!deleteArea.y) return;

        const calcedPos = {
            x: coords.x + drag.current.offset_x,
            y: coords.y + drag.current.offset_y,
        };

        const halfPartHeight =
            (rocketPart.height * rocket.scaleSlider * rocketPart.scale) / 2;

        if (deleteArea.y < coords.y + halfPartHeight) {
            deletePart(rocketPart);
        } else {
            updatePartPosition({
                ...rocketPart,
                ...calcedPos,
            });
        }

        //Clear the dynamically returned dragging part id
        //to clear the blocking
        if (rocketPartIdDrag) setRocketPartIdDrag("");

        drag.current = {
            enabled: false,
            offset_x: 0,
            offset_y: 0,
        };

        setDeleteActive(false);
    };

    return {
        drag,
        handlePartMoveStart,
        handlePartMove,
        handlePartMoveEnd,
    };
};
