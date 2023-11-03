export type RocketStats = {
    totalMass: number;
    totalThrust: number;
    fuelCapacity: number;
    stageStats: StageStats[];
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
