import { trpc } from "@/app/_trpc/client";
import { CursorOptions, cn, getCursorPosition } from "@/lib/utils";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";

import type { RocketPart } from "@prisma/client";
import { RocketContext } from "./RocketContext";

import { Scaling, XCircle } from "lucide-react";
import ControlledSlider from "../ControlledSlider/ControlledSlider";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

interface RocketPartCompProps {
    rocketPart: RocketPart;
    forwardedRef: React.RefObject<any>;
}

const RocketPartComp = ({ rocketPart, forwardedRef }: RocketPartCompProps) => {
    const {
        updatePartPosition,
        rocketPartIdDrag,
        isLoading,
        cursorMode,
        rocket,
        updatePartScale,
        deletePart,
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

    const deleteIconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (rocketPartIdDrag !== "" && rocketPartIdDrag === rocketPart.id) {
            setDrag({
                enabled: true,
                offset_x: 0,
                offset_y: 0,
            });
        }
    }, [rocketPartIdDrag]);

    useEffect(() => {
        setPartPosition({ left: rocketPart.x, top: rocketPart.y });
    }, [rocketPart.x, rocketPart.y]);

    useEffect(() => {
        if (drag.enabled) {
            window.addEventListener("mousemove", handlePartMove);
            window.addEventListener("touchmove", handlePartMove);

            window.addEventListener("mouseup", handlePartMoveEnd);
            window.addEventListener("touchend", handlePartMoveEnd);
        }
    }, [drag]);

    useEffect(() => {
        setDrag({
            enabled: false,
            offset_x: 0,
            offset_y: 0,
        });
    }, [cursorMode]);

    if (!rocketPart) return "";

    const getEventCoords = (
        event:
            | React.MouseEvent<HTMLImageElement>
            | React.TouchEvent<HTMLImageElement>
            | MouseEvent
            | TouchEvent
    ) => {
        if (!forwardedRef.current) return;
        let x, y;

        if ("clientX" in event && event.button === 0) {
            x = event.clientX;
            y = event.clientY;
        } else if ("touches" in event) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        } else return;

        const rect = forwardedRef.current.getBoundingClientRect();
        x = x - rect.left;
        y = y - rect.top;

        return { x, y };
    };

    const handlePartMoveStart = (
        event:
            | React.MouseEvent<HTMLImageElement>
            | React.TouchEvent<HTMLImageElement>
    ) => {
        if (isLoading) return;
        const coords = getEventCoords(event);
        if (!coords) return;

        if (cursorMode === CursorOptions.GRAB)
            setDrag({
                enabled: true,
                offset_x: rocketPart.x - coords.x,
                offset_y: rocketPart.y - coords.y,
            });
        else if (cursorMode === CursorOptions.SELECT) {
            setDrag({
                enabled: !drag.enabled,
                offset_x: drag.enabled ? 0 : coords.x,
                offset_y: drag.enabled ? 0 : coords.y,
            });
        }
    };

    const handlePartMove = (event: MouseEvent | TouchEvent) => {
        if (cursorMode !== CursorOptions.GRAB) return;
        const coords = getEventCoords(event);
        if (!coords) return;

        setPartPosition({
            left: coords.x + drag.offset_x,
            top: coords.y + drag.offset_y,
        });
    };

    const handlePartMoveEnd = (event: MouseEvent | TouchEvent) => {
        if (cursorMode !== CursorOptions.GRAB || !deleteIconRef.current) return;
        const coords = getEventCoords(event);
        if (!coords) return;

        const deleteArea = deleteIconRef.current.getBoundingClientRect();

        //since the delete div is fixed positioned, the height of the top bar
        //has to be taken into count
        const topBarHeight = 56;
        const halfPartHeight =
            (rocketPart.height * rocket!.scaleSlider * rocketPart.scale) / 2;

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

    const PartPopupPosition = () => {
        const canvasBounds = forwardedRef.current.getBoundingClientRect();
        const PART_POPUP_WIDTH = 200;

        let xModif = 0;
        if (canvasBounds.width < drag.offset_x + PART_POPUP_WIDTH) {
            xModif = canvasBounds.width - (drag.offset_x + PART_POPUP_WIDTH);
        }

        return {
            left: drag.offset_x + xModif,
            top: drag.offset_y,
        };
    };

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    ...partPosition,
                    cursor: Cursor(),
                }}
            >
                <Image
                    key={`part_img_${rocketPart.id}`}
                    alt={rocketPart.name}
                    width={
                        rocketPart.width *
                        rocketPart.scale *
                        rocket!.scaleSlider
                    }
                    height={
                        rocketPart.height *
                        rocketPart.scale *
                        rocket!.scaleSlider
                    }
                    src={`/rocket_parts/${rocketPart.image}`}
                    draggable="false"
                    onMouseDown={handlePartMoveStart}
                    onTouchStart={handlePartMoveStart}
                    className="hover:opacity-75 hover:shadow-sm transition duration-300 ease-in-out z-10"
                    style={{ maxWidth: "none" }}
                />
            </div>

            {/* Part scale slider popup */}
            {drag.enabled && cursorMode === CursorOptions.SELECT ? (
                <Card
                    className="absolute w-[200px] z-30"
                    style={{ ...PartPopupPosition() }}
                >
                    <CardHeader className="p-2">
                        <CardTitle className="flex items-center justify-between">
                            <span className="text-lg">Adjust size</span>
                            <Scaling
                                className="ml-1 text-lg cursor-pointer"
                                onClick={() =>
                                    setDrag({
                                        enabled: false,
                                        offset_x: 0,
                                        offset_y: 0,
                                    })
                                }
                            />
                        </CardTitle>
                        <CardDescription className="flex text-sm ">
                            {`Scale of part: ${rocketPart.name}`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-2">
                        <ControlledSlider
                            value={rocketPart.scale}
                            min={0.3}
                            max={1.5}
                            step={0.1}
                            onValueCommit={(values) =>
                                updatePartScale(values[0], rocketPart.id)
                            }
                        />
                    </CardContent>
                </Card>
            ) : null}

            <div
                ref={deleteIconRef}
                className={cn(
                    "fixed flex items-center justify-center curve-effect bottom-0 left-0 right-0 h-16 pointer-events-none slide-in",
                    {
                        "slide-in-active":
                            drag.enabled && cursorMode === CursorOptions.GRAB,
                    }
                )}
            >
                <div className="flex z-10">
                    <XCircle className="text-red-600 h-8 w-8" />
                </div>
            </div>
        </>
    );
};

export default RocketPartComp;
