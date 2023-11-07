import { GlobeLabel, Trajectory } from "@/types/rocket_stats";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

import { RocketContext } from "../RocketEditor/RocketContext";

import Globe from "react-globe.gl";

interface RocketFlightPathProps {
    globeImage: string;
}

const RocketFlightPath = ({ globeImage }: RocketFlightPathProps) => {
    const wrapperDiv = useRef<any>(null);
    const globeEl = useRef<any>(null);

    const [labels, setLabels] = useState<GlobeLabel[]>();
    const [size, setSize] = useState({ width: 1240, height: 800 });

    const { stats } = useContext(RocketContext);

    const trajectories = useMemo(() => {
        if (stats) {
            //const traj = stats.simulateTrajectory();
            const rk4 = stats.trajectoryRK4().trajectories;
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
            let cutP: GlobeLabel | undefined = undefined;

            //Find engine cutoff point
            for (let trajectory of trajectories) {
                if (!trajectory.stageId) {
                    cutP = {
                        lat: trajectory.points[0].lat,
                        lng: trajectory.points[0].lng,
                        alt: trajectory.points[0].alt,
                        labelSize: 0.25,
                        text: "Engine cutoff",
                        color: "lightgray",
                    };
                }
            }
            setLabels([startP]);
            if (!cutP) return;
            setLabels([startP, cutP]);

            const lastTrajectoryPoints =
                trajectories[trajectories.length - 1].points;

            if (lastTrajectoryPoints[lastTrajectoryPoints.length - 1].alt > 0)
                return;

            let endP: GlobeLabel = {
                lat: lastTrajectoryPoints[lastTrajectoryPoints.length - 1].lat,
                lng: lastTrajectoryPoints[lastTrajectoryPoints.length - 1].lng,
                text: "Touchdown",
                color: "lightgray",
            };

            setLabels([startP, cutP, endP]);
        }
    }, [trajectories]);

    useEffect(() => {
        if (globeEl.current && size.width !== wrapperDiv.current.clientWidth) {
            setSize({
                height: globeEl.current.clientHeight,
                width: wrapperDiv.current.clientWidth,
            });
        }
    }, [globeEl.current]);

    useEffect(() => {
        if (globeEl.current && trajectories) {
            const currentStage =
                trajectories[Math.floor(trajectories.length / 2)];
            const midPoint =
                currentStage.points[Math.floor(currentStage.points.length / 2)];

            globeEl.current.pointOfView(
                {
                    lat: midPoint.lat,
                    lng: midPoint.lng,
                    altitude: 0.5,
                },
                2000
            );

            //globeEl.current.controls().target

            // const handleKeyDown = (event: any) => {
            //     switch (event.key) {
            //         case "ArrowLeft":
            //             //globeEl.current.controls().object.position.x -= 5;
            //             globeEl.current.controls().object.rotateX(0.1);
            //             break;
            //         case "ArrowRight":
            //             globeEl.current.controls().object.position.x += 5;
            //             break;
            //         case "ArrowUp":
            //             globeEl.current.controls().object.position.y += 5;
            //             break;
            //         case "ArrowDown":
            //             globeEl.current.controls().object.position.y -= 5;
            //             break;
            //         default:
            //             break;
            //     }
            //     globeEl.current.camera().updateProjectionMatrix();
            //     globeEl.current.camera().updateWorldMatrix(true);

            //     if (globeEl.current.controls().update) {
            //         globeEl.current.controls().update();
            //     }
            // };

            // window.addEventListener("keydown", handleKeyDown);
            // return () => {
            //     window.removeEventListener("keydown", handleKeyDown);
            // };
        }
    }, [trajectories]);

    if (!trajectories) return "";

    return (
        <div ref={wrapperDiv} style={{ width: "95vw", height: "100%" }}>
            <Globe
                ref={globeEl}
                globeImageUrl={globeImage}
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
                width={size.width}
                height={size.height}
            />
        </div>
    );
};

export default RocketFlightPath;
