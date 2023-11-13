import { useContext, useEffect, useState } from "react";
import type { RocketPart } from "@prisma/client";
import { CursorOptions, getEventCoords } from "@/lib/utils";
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
        deletePart,
        updatePartPosition,
        setRocketPartIdDrag,
    } = useContext(RocketContext);

    const [drag, setDrag] = useState({
        enabled: false,
        offset_x: 0,
        offset_y: 0,
    });

    useEffect(() => {
        if (drag.enabled) {
            window.addEventListener("mousemove", handlePartMove);
            window.addEventListener("touchmove", handlePartMove);
            window.addEventListener("mouseup", handlePartMoveEnd);
            window.addEventListener("touchend", handlePartMoveEnd);
        } else {
            window.removeEventListener("mousemove", handlePartMove);
            window.removeEventListener("touchmove", handlePartMove);
            window.removeEventListener("mouseup", handlePartMoveEnd);
            window.removeEventListener("touchend", handlePartMoveEnd);
        }

        return () => {
            window.removeEventListener("mousemove", handlePartMove);
            window.removeEventListener("touchmove", handlePartMove);
            window.removeEventListener("mouseup", handlePartMoveEnd);
            window.removeEventListener("touchend", handlePartMoveEnd);
        };
    }, [drag]);

    useEffect(() => {
        //simulate the drag start on the dynamically created part
        if (rocketPartIdDrag === rocketPart.id && rocket) {
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
        if (!rocket) return;
        if (cursorMode !== CursorOptions.GRAB) return;
        if (!deleteAreaRef.current) return;

        const coords = getEventCoords(editorAreaRef, event, true);
        if (!coords) throw new Error("handlePartMoveEnd no coords");

        const deleteArea = deleteAreaRef.current.getBoundingClientRect();
        if (!deleteArea.y) return;

        const halfPartHeight =
            (rocketPart.height * rocket.scaleSlider * rocketPart.scale) / 2;

        if (deleteArea.y < coords.y + halfPartHeight) {
            deletePart(rocketPart);
        } else {
            updatePartPosition({
                ...rocketPart,
                x: coords.x + drag.offset_x,
                y: coords.y + drag.offset_y,
            });
        }

        //Clear the dynamically returned dragging part id
        //to clear the blocking
        if (rocketPartIdDrag) setRocketPartIdDrag("");

        setDrag({
            enabled: false,
            offset_x: 0,
            offset_y: 0,
        });
    };

    return {
        drag,
        handlePartMoveStart,
        handlePartMove,
        handlePartMoveEnd,
    };
};
