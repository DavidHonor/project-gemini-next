import { useContext } from "react";
import { RocketContext } from "./RocketContext";
import { CursorOptions, cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Grab, MousePointerSquareDashed } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import ControlledSlider from "../ControlledSlider/ControlledSlider";

const EditorControls = ({
    editorAreaRef,
}: {
    editorAreaRef: React.RefObject<HTMLDivElement>;
}) => {
    const { setCursorMode, cursorMode, updateRocketScale, rocket, fitToView } =
        useContext(RocketContext);

    if (!rocket) return "";

    return (
        <div className="absolute flex left-1 top-1 z-30 gap-1">
            <Button
                variant={"outline"}
                className={cn("px-2", {
                    "bg-zinc-300": cursorMode === CursorOptions.GRAB,
                })}
                onClick={() => setCursorMode(CursorOptions.GRAB)}
            >
                <Grab className="w-5 h-5" />
            </Button>

            <Button
                variant={"outline"}
                className={cn("px-2", {
                    "bg-zinc-300": cursorMode === CursorOptions.SELECT,
                })}
                onClick={() => setCursorMode(CursorOptions.SELECT)}
            >
                <MousePointerSquareDashed className="w-5 h-5" />
            </Button>

            <Card className="flex items-center justify-center">
                <CardContent className="flex flex-row p-1 w-[170px]">
                    <ControlledSlider
                        max={1.5}
                        min={0.1}
                        step={0.05}
                        value={rocket.scaleSlider}
                        onValueCommit={(values) => {
                            updateRocketScale({
                                scale: values[0],
                            });
                        }}
                    />
                </CardContent>
            </Card>

            <Button
                variant={"outline"}
                className={cn("px-2", {})}
                onClick={() =>
                    fitToView(editorAreaRef!.current!.getBoundingClientRect())
                }
            >
                Fit to screen
            </Button>
        </div>
    );
};

export default EditorControls;
