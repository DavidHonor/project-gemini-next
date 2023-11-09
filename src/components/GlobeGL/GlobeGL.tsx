import { GlobeLabel, Trajectory } from "@/types/rocket_stats";
import React, { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

interface GlobeGLProps {
    trajectories: Trajectory[];
    labels: GlobeLabel[];
    globeImage?: string;
}

const GlobeGL = ({ trajectories, labels, globeImage }: GlobeGLProps) => {
    const globeEl = useRef<GlobeMethods | undefined>(undefined);
    const wrapperDiv = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 1240, height: 800 });

    useEffect(() => {
        if (
            globeEl.current &&
            wrapperDiv.current &&
            size.width !== wrapperDiv.current.clientWidth
        ) {
            setSize({
                height: wrapperDiv.current.clientHeight,
                width: wrapperDiv.current.clientWidth,
            });

            const maxLabel = labels.find((x) => x.text === "Peak altitude");
            if (maxLabel) {
                globeEl.current.pointOfView(
                    {
                        lat: maxLabel.lat,
                        lng: maxLabel.lng,
                        altitude: 0.4,
                    },
                    2000
                );
            }

            const controls = globeEl.current.controls();

            controls.enable = false;
            controls.enablePan = true;
            //controls.autoRotate = true;
            controls.update();
        }
    }, [globeEl.current]);

    const imagePath = globeImage ?? "/world_small.jpg";

    return (
        <div ref={wrapperDiv} style={{ width: "100%", height: "100%" }}>
            <Globe
                ref={globeEl}
                globeImageUrl={imagePath}
                pathsData={trajectories}
                pathPoints={(d: any) => d.points}
                pathPointLat={(p) => p.lat}
                pathPointLng={(p) => p.lng}
                pathPointAlt={(p) => p.alt}
                pathColor={(p: any) => p.pathColor}
                pathStroke={(p: any) => p.pathStroke}
                labelsData={labels}
                labelColor={(p: any) => p.color ?? "lightgray"}
                labelAltitude={(p: any) => p.alt ?? 0}
                labelRotation={(p: any) => p.labelRotation ?? 45}
                labelSize={(p: any) => p.labelSize ?? 0.5}
                labelDotRadius={(p: any) => p.labelDotRadius ?? 0.1}
                width={size.width}
                height={size.height}
            />
        </div>
    );
};

export default GlobeGL;
