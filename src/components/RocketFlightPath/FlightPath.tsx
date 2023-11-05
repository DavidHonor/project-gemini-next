import { GlobeLabel, Trajectory } from "@/types/rocket_stats";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { RocketContext } from "../RocketEditor/RocketContext";

const RocketFlightPath = () => {
    const globeEl = useRef<any>(null);
    const [labels, setLabels] = useState<GlobeLabel[]>();

    const { stats } = useContext(RocketContext);

    const trajectories = useMemo(() => {
        if (stats) {
            //const traj = stats.simulateTrajectory();
            const rk4 = stats.trajectoryRK4();
            return [...rk4];
        }
        return [];
    }, [stats]);

    useEffect(() => {
        if (trajectories) {
            let startP: GlobeLabel = {
                lat: trajectories[0].points[0].lat,
                lng: trajectories[0].points[0].lng,
                text: "Launchpad 39A",
                color: "lightgray",
            };
            const lastTrajectoryPoints =
                trajectories[trajectories.length - 1].points;

            if (lastTrajectoryPoints[lastTrajectoryPoints.length - 1].alt > 0) {
                setLabels([startP]);
                return;
            }

            let endP: GlobeLabel = {
                lat: lastTrajectoryPoints[lastTrajectoryPoints.length - 1].lat,
                lng: lastTrajectoryPoints[lastTrajectoryPoints.length - 1].lng,
                text: "Touchdown",
                color: "lightgray",
            };

            //Find point after engine cutoff
            for (let trajectory of trajectories) {
                if (!trajectory.stageId) {
                    let cutP: GlobeLabel = {
                        lat: trajectory.points[0].lat,
                        lng: trajectory.points[0].lng,
                        alt: trajectory.points[0].alt,
                        labelSize: 0.25,
                        text: "Engine cutoff",
                        color: "lightgray",
                    };
                    setLabels([startP, cutP, endP]);
                    return;
                }
            }

            setLabels([startP, endP]);
        }
    }, [trajectories]);

    useEffect(() => {
        if (globeEl.current && trajectories) {
            const currentStage =
                trajectories[Math.floor(trajectories.length / 2)]; // for example, focusing on the second stage
            const midPoint =
                currentStage.points[Math.floor(currentStage.points.length / 2)]; // taking a middle point

            globeEl.current.pointOfView(
                {
                    lat: midPoint.lat,
                    lng: midPoint.lng,
                    altitude: 0.5,
                },
                2000
            );
        }
    }, [trajectories]);

    if (!trajectories) return "";

    return (
        <div>
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                pathsData={trajectories}
                pathPoints={(d: any) => d.points}
                pathPointLat={(p) => p.lat}
                pathPointLng={(p) => p.lng}
                pathPointAlt={(p) => p.alt}
                pathColor={(p: any) => p.pathColor}
                pathStroke={(p: any) => p.pathStroke}
                labelsData={labels}
                labelColor={(p: any) => p.color}
                labelAltitude={(p: any) => (p.alt !== undefined ? p.alt : 0)}
                labelRotation={(p: any) =>
                    p.labelRotation !== undefined ? p.labelRotation : 45
                }
                labelSize={(p: any) =>
                    p.labelSize !== undefined ? p.labelSize : 0.5
                }
            />
        </div>
    );
};

export default RocketFlightPath;
