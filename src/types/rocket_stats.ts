export type RocketStats = {
    largestSection: number;
    stageStats: StageStats[];
    getFlightData: () => FlightData;
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
