"use client";

import { DefaultTrajectorySimulation } from "@/config/mock_trajectory";

import dynamic from "next/dynamic";
const GlobeGLNoSSR = dynamic(() => import("./GlobeGL"), {
    ssr: false,
});

const GlobeWrapper = () => {
    const sim = DefaultTrajectorySimulation();

    return <GlobeGLNoSSR trajectories={sim.trajectories} labels={sim.labels} />;
};

export default GlobeWrapper;
