import RocketPartImg from "./RocketPartImg";

const RocketSample = () => {
    return (
        <div className="flex flex-col pt-20 lg:pt-40 space-y-20 lg:space-y-30 pb-20">
            <div className="w-full max-w-screen-xl mx-auto relative">
                <video
                    className="w-full h-auto max-h-[50vh] object-cover"
                    muted={true}
                    autoPlay={true}
                    loop={true}
                    playsInline
                    src={"/globe_traj.mp4"}
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-5 bg-black bg-opacity-30">
                    <span className="text-white font-bold text-2xl lg:text-5xl text-center">
                        Simulate trajectories in 3D
                    </span>
                </div>
            </div>

            <RocketPartImg
                imageSource={"/editor_preview.png"}
                alt="merlin engine"
                lefty={false}
                description={"Easily edit the scale of your rocket & parts"}
            />

            <h2 className="font-bold text-4xl">Part catalog</h2>

            <RocketPartImg
                imageSource={"/rocket_parts/gemini.png"}
                alt="command pod"
                lefty={true}
                description={
                    "A command pod is responsible for controlling the rocket systems, it has a mass of 3500kgs."
                }
            />

            <RocketPartImg
                imageSource={"/rocket_parts/fuel_3m.png"}
                alt="fuel tank"
                lefty={false}
                description={
                    "Holds the necessary propellant (oxidizer and fuel) for the rocket."
                }
            />

            <RocketPartImg
                imageSource={"/rocket_parts/merlin_c.png"}
                alt="merlin engine"
                lefty={true}
                description={
                    "Converts the liquid propellant into a fast moving gas, which propels the rocket forward"
                }
            />
        </div>
    );
};

export default RocketSample;
