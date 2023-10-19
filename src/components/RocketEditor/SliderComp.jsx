import { useEffect, useState } from "react";
import { Slider } from "../ui/slider";

export default function SliderComp(props) {
    const [value, setValue] = useState(props.sliderValue);

    useEffect(() => {
        if (props.sliderValue !== value) setValue(props.sliderValue);
    }, [props.sliderValue]);

    return (
        <Slider
            value={value}
            onValueChange={(newValue) => setValue(newValue)}
            onValueCommit={(newValue) => {
                props.sliderValueChanged(newValue);
            }}
            min={props.min}
            max={props.max}
            step={props.step}
            marks={props.marks}
        />
    );
}
