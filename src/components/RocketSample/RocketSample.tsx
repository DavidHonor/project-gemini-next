import { cn } from "@/lib/utils";
import RocketPartImg from "./RocketPartImg";

const RocketSample = () => {
    return (
        <div className="flex flex-col pt-40 space-y-60 pb-40">
            <RocketPartImg
                imageSource={"/rocket_parts/gemini.png"}
                alt="command pod"
                width={300}
                height={300}
                description={
                    "The command pod is responsible for controlling the rocket, it has a weight of 3500kgs."
                }
            />

            <RocketPartImg
                imageSource={"/rocket_parts/fuel_3m.png"}
                alt="fuel tank"
                width={200}
                height={200}
                description={
                    "Holds the necessary propellant (oxidizer and fuel) for the rocket."
                }
            />

            <RocketPartImg
                imageSource={"/rocket_parts/merlin_c.png"}
                alt="merlin engine"
                width={150}
                height={150}
                description={
                    "The command pod is responsible for controlling the rocket, it has a weight of 3500kgs."
                }
            />
        </div>
    );
};

export default RocketSample;
