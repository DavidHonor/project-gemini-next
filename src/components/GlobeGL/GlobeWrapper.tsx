"use client";

import { GlobeLabel, Trajectory } from "@/types/rocket_stats";
import dynamic from "next/dynamic";
const GlobeGLNoSSR = dynamic(() => import("./GlobeGL"), {
    ssr: false,
});

interface GlobeWrapperProps {
    trajectories: Trajectory[];
    labels: GlobeLabel[];
    globeImage?: string;
}
const GlobeWrapper = ({
    trajectories,
    labels,
    globeImage,
}: GlobeWrapperProps) => {
    return (
        <GlobeGLNoSSR
            trajectories={trajectories}
            labels={labels}
            globeImage={globeImage}
        />
    );
};

export default GlobeWrapper;
