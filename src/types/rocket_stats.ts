export type RocketStats = {
    totalWeight: number;
    totalThrust: number;
    fuelCapacity: number;
    stageStats: StageStats[];
};

export type StageStats = {
    stageId: string;

    individual: {
        totalWeight: number;
        dryWeight: number;
        totalThrust: number;
    };

    stacked: {
        totalWeight: number;
        dryWeight: number;
        totalThrust: number;
    };
};
