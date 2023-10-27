import React, { useState } from "react";
import { Slider } from "../ui/slider";
import { roundToDecimalPlaces } from "@/lib/utils";

interface ControlledSliderProps {
    value: number;
    max: number | undefined;
    min: number | undefined;
    step: number | undefined;
    onValueCommit: (value: number[]) => void;
}

const ControlledSlider = ({
    value,
    max,
    min,
    step,
    onValueCommit,
}: ControlledSliderProps) => {
    const [stateValue, setValue] = useState<number>(value);

    return (
        <div className="flex w-full">
            <Slider
                defaultValue={[1]}
                max={max}
                min={min}
                step={step}
                value={[stateValue]}
                onValueChange={(values) => {
                    setValue(values[0]);
                }}
                onValueCommit={onValueCommit}
                className="w-[100%]"
            />
            <p className="pl-2 font-semibold text-zinc-700">
                {`${roundToDecimalPlaces(stateValue * 100, 1)}%`}
            </p>
        </div>
    );
};

export default ControlledSlider;
