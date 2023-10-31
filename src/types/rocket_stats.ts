export type RocketStats = {
    totalWeight: number;
    totalThrust: number;
    fuelCapacity: number;
    stageStats: StageStats[];
};

export type StageStats = {
    stageId: string;
    totalWeight: number;
    dryWeight: number;
    totalThrust: number;
};
