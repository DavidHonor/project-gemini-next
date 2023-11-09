import { computeDestinationPoint } from "geolib";
import { GlobeLabel, Trajectory } from "../types/rocket_stats";
import { DefaultLaunchConfig, EARTH_RADIUS } from "./rocket_parts";

export const DefaultTrajectorySimulation = () => {
    let trajectories: Trajectory[] = [
        {
            stageId: "Stage 1",
            label: "Stage 1",
            pathStroke: "2px",
            pathColor: "yellow",
            points: [],
        },
    ];
    let labels: GlobeLabel[] = [];

    let HEADING = Math.random() * 360;
    let distance = 0;
    let altitude = 0;

    for (let i = 1; i < 23; i++) {
        const coords = computeDestinationPoint(
            {
                latitude: DefaultLaunchConfig.LAUNCH_LAT,
                longitude: DefaultLaunchConfig.LAUNCH_LNG,
            },
            distance,
            HEADING
        );

        trajectories[0].points.push({
            lat: coords.latitude,
            lng: coords.longitude,
            alt: altitude / EARTH_RADIUS,
        });

        distance += Math.pow(2, i);

        if (i < 16) altitude += Math.pow(2, i);
    }

    labels.push({
        lat: DefaultLaunchConfig.LAUNCH_LAT,
        lng: DefaultLaunchConfig.LAUNCH_LNG,
        alt: 0,
        text: "Launch site",
        labelRotation: 45,
    });

    return { trajectories, labels };
};
