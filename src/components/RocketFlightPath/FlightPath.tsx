import { Trajectory } from "@/types/rocket_stats";
import React, { useContext, useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { RocketContext } from "../RocketEditor/RocketContext";

const RocketFligtPath = () => {
    const globeEl = useRef<any>(null);
    const [trajectory, setTrajectory] = useState<Trajectory[]>();

    const { stats } = useContext(RocketContext);

    useEffect(() => {
        if (stats) {
            const traj = stats.simulateTrajectory();
            const rk4 = stats.trajectoryRK4();

            console.log(rk4);
            setTrajectory([...traj, ...rk4]);
        }
    }, [stats]);

    useEffect(() => {
        // If you need to set the initial point of view or any other initial globe settings, do it here.
        if (globeEl.current && trajectory) {
            // Aim at a specific location with an appropriate altitude to encompass the entire flight path
            globeEl.current.pointOfView({
                lat: trajectory[0].points[0].lat,
                lng: trajectory[0].points[0].lng,
                altitude: 2,
            });
        }
    }, [trajectory]);

    if (!trajectory) return "";

    return (
        <div>
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                pathsData={trajectory}
                pathPoints={(d: any) => d.points}
                pathPointLat={(p) => p.lat}
                pathPointLng={(p) => p.lng}
                pathPointAlt={(p) => p.alt}
                pathColor={(p: any) => p.pathColor}
                pathStroke={(p: any) => p.pathStroke}
            />
        </div>
    );
};

export default RocketFligtPath;
