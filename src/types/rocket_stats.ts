import { State } from "@/lib/rk4_trajectory";

export type RocketStats = {
    largestSection: number;
    stageStats: StageStats[];
    getFlightData: () => FlightData;
    simulateTrajectory: () => Trajectory[];
    trajectoryRK4: () => Trajectory[];
};

export type StageStats = {
    stageId: string;

    individual: {
        totalMass: number;
        dryMass: number;

        totalThrust: number;
        totalIsp: number;
        totalMassFlowRate: number;
        burnTime: number;

        deltaV: number;
    };

    stacked: {
        totalMass: number;
        dryMass: number;

        totalThrust: number;
        totalIsp: number;
        burnTime: number;

        deltaV: number;
    };
};

export type FlightData = {
    records: FlightRecord[];
};

export type FlightRecord = {
    stageId: string;

    timeElapsed: number;
    twr: number;
    mass: number;
    velocity: number;

    altitude: number;
    east: number;

    drag: number;
    gravityForce: number;
};

export type Trajectory = {
    stageId: string;

    points: Point[];
    label: string;
    pathColor: string;
    pathStroke: string;
};

export type RK4TrajectorySimulation = {
    state: State;
    trajectory: Trajectory;
};

export type Point = {
    lat: number;
    lng: number;
    alt: number;
};

export type GlobeLabel = {
    lat: number;
    lng: number;
    alt?: number;
    text: string;

    color?: string;
    labelRotation?: number;
    labelSize?: number;
};
