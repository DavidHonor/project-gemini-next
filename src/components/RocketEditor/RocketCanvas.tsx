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

import { Loader2, XCircle } from "lucide-react";
import { RocketContext } from "./RocketContext";
import { CursorOptions, cn } from "@/lib/utils";

import { toPng } from "html-to-image";
import EditorControls from "./EditorControls";
import RocketPartResize from "../PocketPartComponents/RocketPartResize";

interface RocketCanvasProps {
    rocket: Rocket;
}

const RocketCanvas = ({ rocket }: RocketCanvasProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const deleteAreaRef = useRef<HTMLDivElement>(null);

    const [activePart, setActivePart] = useState<RocketPart | null>(null);

    const { cursorMode, uploadRocketPreview } = useContext(RocketContext);

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
        <div ref={ref} className="h-full w-full relative">
            {rocket.stages.flatMap((stage) => {
                return stage.parts.map((part: RocketPart) => {
                    return (
                        <RocketPartComp
                            key={"rocketPart_" + part.id}
                            rocketPart={part}
                            setActivePart={setActivePart}
                            editorAreaRef={ref}
                            deleteAreaRef={deleteAreaRef}
                            rocket={rocket}
                        />
                    );
                });
            })}

            <EditorControls />

            <RocketPartResize
                setActivePart={setActivePart}
                activePart={activePart}
                editorAreaRef={ref}
            />

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
