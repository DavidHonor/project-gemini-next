import { trpc } from "@/app/_trpc/client";
import { getCursorPosition } from "@/lib/utils";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";

import type { RocketPart } from "@prisma/client";
import { RocketContext } from "./RocketContext";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CogIcon } from "lucide-react";

interface RocketPartCompProps {
    rocketPart: RocketPart;
    forwardedRef: React.RefObject<any>;
}

const RocketPartComp = ({ rocketPart, forwardedRef }: RocketPartCompProps) => {
    const { saveRocketPart, rocketPartIdDrag } = useContext(RocketContext);

    const [drag, setDrag] = useState({
        enabled: false,
        offset_x: 0,
        offset_y: 0,
    });

    const [selected, setSelected] = useState(false);

    const [positioning, setPositioning] = useState({
        left: rocketPart?.x,
        top: rocketPart?.y,
    });
    const finalPosition = useRef({
        x: 0,
        y: 0,
    });

    if (!rocketPart) return "";

    useEffect(() => {
        if (rocketPartIdDrag !== "" && rocketPartIdDrag === rocketPart.id) {
            console.log("DRAG START");
            setDrag({
                enabled: true,
                offset_x: 0,
                offset_y: 0,
            });
        }
    }, [rocketPartIdDrag]);

    const initialOffset = (event: React.MouseEvent<HTMLImageElement>) => {
        if (event.button === 0) {
            const rect = forwardedRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setDrag({
                enabled: true,
                offset_x: rocketPart.x - x,
                offset_y: rocketPart.y - y,
            });
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
                //handle save rocket part
                console.log("save this:", finalPosition.current);

                saveRocketPart({
                    ...rocketPart,
                    x: finalPosition.current.x,
                    y: finalPosition.current.y,
                });

                setSelected((prevstate) => !prevstate);

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
        <div
            style={{
                position: "absolute",
                ...positioning,
                cursor: drag ? "grabbing" : "grab",
            }}
            className="z-10"
        >
            <Image
                key={`part_img_${rocketPart.id}`}
                alt={rocketPart.name}
                width={rocketPart.width * rocketPart.scale}
                height={rocketPart.height * rocketPart.scale}
                src={`/rocket_parts/${rocketPart.image}`}
                draggable="false"
                onMouseDown={initialOffset}
                className="hover:opacity-75 hover:shadow-sm transition duration-300 ease-in-out"
                style={{ maxWidth: "none" }}
            />
            {selected ? (
                <Popover>
                    <PopoverTrigger className="z-50">
                        <CogIcon className="w-5 h-5 p-1 rounded bg-white" />
                    </PopoverTrigger>
                    <PopoverContent className="z-50">
                        Place content for the popover here.
                    </PopoverContent>
                </Popover>
            ) : null}
        </div>
    );
};

export default RocketPartComp;
