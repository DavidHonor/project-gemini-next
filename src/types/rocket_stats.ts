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

export type Point = {
    lat: number;
    lng: number;
    alt: number;
};
