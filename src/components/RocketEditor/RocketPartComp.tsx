import { trpc } from "@/app/_trpc/client";
import { CursorOptions, getCursorPosition } from "@/lib/utils";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";

import type { RocketPart } from "@prisma/client";
import { RocketContext } from "./RocketContext";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CogIcon, XCircle } from "lucide-react";
import ControlledSlider from "../ControlledSlider/ControlledSlider";

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
    } = useContext(RocketContext);

    const [drag, setDrag] = useState({
        enabled: false,
        offset_x: 0,
        offset_y: 0,
    });

    const [selected, setSelected] = useState(false);

    const [positioning, setPositioning] = useState({
        left: rocketPart.x,
        top: rocketPart.y,
    });
    const finalPosition = useRef({
        x: rocketPart.x,
        y: rocketPart.y,
    });

    const deleteIconRef = useRef<HTMLDivElement>(null);

    if (!rocketPart) return "";

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
        setPositioning({ left: rocketPart.x, top: rocketPart.y });
    }, [rocketPart.x, rocketPart.y]);

    const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
        if (event.button === 0 && !isLoading) {
            const rect = forwardedRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            if (cursorMode === CursorOptions.GRAB)
                setDrag({
                    enabled: true,
                    offset_x: rocketPart.x - x,
                    offset_y: rocketPart.y - y,
                });
            else if (cursorMode === CursorOptions.SELECT) {
                setSelected((isSelected) => !isSelected);
            }
        }
    };

    useEffect(() => {
        if (drag.enabled) {
            const handleMouseMove = (event: MouseEvent) => {
                if (forwardedRef.current) {
                    const rect = forwardedRef.current.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;

                    setPositioning({
                        left: x + drag.offset_x,
                        top: y + drag.offset_y,
                    });

                    finalPosition.current.x = x + drag.offset_x;
                    finalPosition.current.y = y + drag.offset_y;
                }
            };

            const handleMouseUp = () => {
                if (deleteIconRef.current)
                    console.log(deleteIconRef.current.getBoundingClientRect());

                updatePartPosition({
                    ...rocketPart,
                    x: finalPosition.current.x,
                    y: finalPosition.current.y,
                });

                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);

                setDrag({
                    enabled: false,
                    offset_x: 0,
                    offset_y: 0,
                });
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
    }, [drag]);

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    ...positioning,
                    cursor: drag ? "grabbing" : "grab",
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
                    onMouseDown={handleMouseDown}
                    className="hover:opacity-75 hover:shadow-sm transition duration-300 ease-in-out z-10"
                    style={{ maxWidth: "none" }}
                />
                {selected ? (
                    <Popover>
                        <PopoverTrigger className="z-30 bg-white rounded relative">
                            <CogIcon className="w-8 h-8 p-1" />
                        </PopoverTrigger>
                        <PopoverContent className="z-30">
                            <ControlledSlider
                                value={rocketPart.scale}
                                min={0.3}
                                max={1.5}
                                step={0.1}
                                onValueCommit={(values) =>
                                    updatePartScale(values[0], rocketPart.id)
                                }
                            />
                        </PopoverContent>
                    </Popover>
                ) : null}
            </div>
            {drag.enabled || true ? (
                <div
                    ref={deleteIconRef}
                    className="group absolute bottom-5 left-1/2"
                >
                    <XCircle className="h-8 w-8 duration-300 ease-out text-red-300 hover:text-red-600 z-20" />
                    <div className="fixed curve-effect bottom-0 left-0 right-0 h-16 z-10 pointer-events-none"></div>
                </div>
            ) : null}
        </>
    );
};

export default RocketPartComp;
