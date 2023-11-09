import { LaunchConfigType } from "@/config/rocket_parts";
import { State } from "@/lib/rk4_trajectory";

export type RocketStats = {
    stageStats: StageStats[];

    getFlightData: () => FlightData;
    simulateTrajectory: () => Trajectory[];
    trajectoryRK4: (
        launchConfigOverride?: LaunchConfigType
    ) => SimulationResult;
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

export type SimulationResult = {
    trajectories: Trajectory[];
    flightData: FlightData;
};

export type RK4TrajectorySimulation = {
    state: State;
    trajectory: Trajectory;
    flightData: FlightData;
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
    labelDotRadius?: number;
};
