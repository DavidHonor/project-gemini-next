import React, { useContext } from "react";
import { RocketContext } from "./RocketContext";
import { RocketStage } from "@/types/rocket";
import { RocketPart } from "../../../prisma/generated/zod";
import { ChevronDown, ChevronUp, CogIcon, PlusIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { roundToDecimalPlaces } from "@/lib/utils";
import { RocketStats } from "@/types/rocket_stats";
import { RocketPartPrototypes } from "@/config/rocket_parts";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

const RocketStages = () => {
    const { rocket, stats, addRocketStage } = useContext(RocketContext);

    if (!rocket || !stats) return "";

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
                {rocket.stages.map((stage, stageIndex) => (
                    <Stage
                        key={stage.id}
                        stage={stage}
                        stageIndex={stageIndex}
                        stats={stats}
                    />
                ))}
            </div>
            <div className="flex justify-center w-full py-2">
                <Button variant={"outline"} onClick={() => addRocketStage()}>
                    <span className="text-xs lg:text-base">Add</span>
                    <PlusIcon className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </div>
    );
};

const Stage = ({
    stage,
    stageIndex,
    stats,
}: {
    stage: RocketStage;
    stageIndex: number;
    stats: RocketStats;
}) => {
    const stageStats = stats.stageStats.find((x) => x.stageId === stage.id);
    if (!stageStats) return "performance unavailable";

    return (
        <div className="flex flex-col w-full py-1 border-b-2">
            <div className="flex items-center justify-between py-1">
                <h2 className="text-base font-medium ">
                    Stage {stageIndex + 1}
                </h2>
                <span className="text-xs" title="total weight">
                    {roundToDecimalPlaces(stageStats.individual.totalWeight, 0)}
                    kg
                </span>
                <span className="text-xs" title="number of parts">
                    [{stage.parts.length}]
                </span>
            </div>
            <div className="flex flex-col">
                {stage.parts.map((part) => (
                    <Part key={part.id} part={part} />
                ))}
            </div>
        </div>
    );
};

const Part = ({ part }: { part: RocketPart }) => {
    const protPart = RocketPartPrototypes.find((x) => x.name === part.name);
    if (!protPart) return "Part details not found: " + part.name;

    return (
        <div className="flex items-center justify-between pl-4 border-t text-sm">
            <div className="basis-3/6">
                <span>{part.name}</span>
            </div>

            <div className="basis-2/6">
                <span
                    className="invisible lg:visible lg:text-xs"
                    title="part scale"
                >
                    {roundToDecimalPlaces(part.scale * 100, 0)}%
                </span>
            </div>

            <div className="flex justify-end basis-1/6">
                <PartActionsPopover part={part} />
            </div>
        </div>
    );
};

const PartActionsPopover = ({ part }: { part: RocketPart }) => {
    const { updatePartStage } = useContext(RocketContext);

    return (
        <Popover>
            <PopoverTrigger>
                <CogIcon className="w-5 h-5 text-gray-400" />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col p-2 w-[220px] gap-1">
                <div className="flex flex-col relative">
                    <span className="text-md">{part.name}</span>
                    <span className="text-xs">{part.part_type}</span>
                    <span className="text-xs">{part.weight} kg</span>
                </div>

                <Separator decorative />

                <div className="flex items-center justify-between">
                    <span className="text-sm">Move to previous stage</span>
                    <Button
                        title="move to previous stage"
                        variant={"ghost"}
                        className="p-1 h-5"
                        onClick={() =>
                            updatePartStage({ part, moveDirection: -1 })
                        }
                    >
                        <ChevronUp className="w-5 h-5" />
                    </Button>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm">Move to next stage</span>
                    <Button
                        title="move to next stage"
                        variant={"ghost"}
                        className="p-1 h-5"
                        onClick={() =>
                            updatePartStage({ part, moveDirection: 1 })
                        }
                    >
                        <ChevronDown className="w-5 h-5" />
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default RocketStages;
