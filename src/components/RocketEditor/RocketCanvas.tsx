import { Rocket } from "@/types/rocket";
import { RocketPart } from "../../../prisma/generated/zod";

import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import RocketPartComp from "./PocketPartComponents/RocketPartComp";

import { Loader2, XCircle } from "lucide-react";
import { RocketContext } from "./RocketContext";
import { CursorOptions, cn } from "@/lib/utils";

import EditorControls from "./EditorControls";
import RocketPartResize from "./PocketPartComponents/RocketPartResize";
import { useImageUpload } from "./useImageUpload";

interface RocketCanvasProps {
    rocket: Rocket;
}

const RocketCanvas = ({ rocket }: RocketCanvasProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const deleteAreaRef = useRef<HTMLDivElement>(null);

    const [activePart, setActivePart] = useState<RocketPart | null>(null);

    const { cursorMode, deleteAreaActive } = useContext(RocketContext);

    const {} = useImageUpload({ editorRef: ref, rocket });

    const stopContext = (event: any) => {
        event.preventDefault();
    };

    useEffect(() => {
        window.addEventListener("contextmenu", stopContext);
        return () => {
            window.removeEventListener("contextmenu", stopContext);
        };
    }, []);

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
        <div ref={ref} className="h-full w-full relative select-none">
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

            <EditorControls editorAreaRef={ref} />

            <RocketPartResize
                setActivePart={setActivePart}
                activePart={activePart}
                editorAreaRef={ref}
            />

            <div
                ref={deleteAreaRef}
                className={cn(
                    `absolute flex items-center justify-center bottom-0 left-0 right-0 h-16 pointer-events-none slide-in border-t-3 border-dashed border-red-500 bg-red-200`,
                    {
                        "slide-in-active":
                            cursorMode === CursorOptions.GRAB &&
                            deleteAreaActive,
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
