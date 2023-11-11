import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import ControlledSlider from "../ControlledSlider/ControlledSlider";

const RocketPartResize = () => {
    const PartPopupPosition = () => {
        const canvasBounds = deleteAreaRef.current.getBoundingClientRect();
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
        <Card
            className="absolute w-[200px] z-30"
            style={{ ...PartPopupPosition() }}
        >
            <CardHeader className="p-2">
                <CardTitle className="flex items-center justify-between">
                    <span className="text-base font-bold">Adjust size</span>
                    <Button
                        className="p-1 h-6 flex"
                        variant={"ghost"}
                        onClick={() =>
                            setDrag({
                                enabled: false,
                                offset_x: 0,
                                offset_y: 0,
                            })
                        }
                    >
                        <XCircle className="w-5 h-5 cursor-pointer" />
                    </Button>
                </CardTitle>
                <CardDescription className="flex text-sm">
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
                        updatePartScale({
                            partScale: values[0],
                            partId: rocketPart.id,
                        })
                    }
                />
            </CardContent>
        </Card>
    );
};

export default RocketPartResize;
