import { useContext } from "react";

import ControlledSlider from "../ControlledSlider/ControlledSlider";
import { RocketPart } from "../../../prisma/generated/zod";
import { XCircle } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { RocketContext } from "../RocketEditor/RocketContext";
import { CursorOptions } from "@/lib/utils";

interface RocketPartResizeProps {
    setActivePart: (part: RocketPart | null) => void;
    activePart: RocketPart | null;
    editorAreaRef: React.RefObject<HTMLDivElement>;
}

const RocketPartResize = ({
    setActivePart,
    activePart,
    editorAreaRef,
}: RocketPartResizeProps) => {
    const { updatePartScale, cursorMode } = useContext(RocketContext);

    if (!activePart || cursorMode === CursorOptions.GRAB) return "";

    const POPUP_WIDTH = 200;

    const PartPopupPosition = () => {
        if (editorAreaRef.current === null)
            return {
                left: activePart.x,
                top: activePart.y,
            };

        const bounds = editorAreaRef.current.getBoundingClientRect();
        const minusX =
            bounds.width < activePart.x + POPUP_WIDTH
                ? activePart.x + POPUP_WIDTH - bounds.width
                : 0;
        return {
            left: activePart.x - minusX,
            top: activePart.y,
        };
    };

    return (
        <Card
            className={`absolute w-[${POPUP_WIDTH}px] z-30`}
            style={{ ...PartPopupPosition() }}
        >
            <CardHeader className="p-2">
                <CardTitle className="flex items-center justify-between">
                    <span className="text-base font-bold">Adjust size</span>
                    <Button
                        className="p-1 h-6 flex"
                        variant={"ghost"}
                        onClick={() => setActivePart(null)}
                    >
                        <XCircle className="w-5 h-5 cursor-pointer" />
                    </Button>
                </CardTitle>
                <CardDescription className="flex text-sm">
                    {`Scale of part: ${activePart.name}`}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-2">
                <ControlledSlider
                    value={activePart.scale}
                    min={0.1}
                    max={1.5}
                    step={0.1}
                    onValueCommit={(values) =>
                        updatePartScale({
                            partScale: values[0],
                            partId: activePart.id,
                        })
                    }
                />
            </CardContent>
        </Card>
    );
};

export default RocketPartResize;
