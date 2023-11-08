import React, { useContext, useState } from "react";
import { RocketContext } from "../RocketEditor/RocketContext";
import { Rocket, RocketStage } from "@/types/rocket";
import { RocketPart } from "../../../prisma/generated/zod";
import { ChevronDown, ChevronUp, CogIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn, roundToDecimalPlaces } from "@/lib/utils";
import { RocketStats } from "@/types/rocket_stats";
import { RocketPartPrototypes } from "@/config/rocket_parts";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

const RocketStages = () => {
    const { rocket, stats, addRocketStage } = useContext(RocketContext);

    if (!rocket || !stats) return "";

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
                {rocket.stages.map((stage) => (
                    <Stage
                        key={stage.id}
                        stage={stage}
                        stats={stats}
                        rocket={rocket}
                    />
                ))}
            </div>
            <div className="flex justify-center w-full py-2">
                <Button variant={"ghost"} onClick={() => addRocketStage()}>
                    <span className="text-xs lg:text-base">Add</span>
                    <PlusIcon className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </div>
    );
};

const Stage = ({
    stage,
    stats,
    rocket,
}: {
    stage: RocketStage;
    stats: RocketStats;
    rocket: Rocket;
}) => {
    const { deleteStage } = useContext(RocketContext);

    const stageStats = stats.stageStats.find((x) => x.stageId === stage.id);
    if (!stageStats) return "performance unavailable";

    return (
        <div className="flex flex-col w-full py-1 border-b-2">
            <div className="flex items-center justify-between py-1">
                <div className="flex gap-1">
                    <h2 className="text-base font-medium">Stage</h2>
                    <StageIndexSelector
                        length={rocket.stages.length}
                        index={stage.stageIndex}
                        stageId={stage.id}
                    />
                </div>

                <div className="flex items-center gap-1">
                    <DeleteDialog
                        triggerBtnClass="p-1 flex h-5"
                        triggerIconClass="w-4 h-4"
                        deleteTitle="Delete stage"
                        deleteText={`Are you sure to delete stage ${
                            stage.stageIndex + 1
                        }, including all its parts?`}
                        deleteAction={() => deleteStage(stage.id)}
                    />
                    <span className="text-xs" title="number of parts">
                        [{stage.parts.length}]
                    </span>
                </div>
            </div>
            <div className="flex flex-col">
                {stage.parts.map((part) => (
                    <Part
                        key={part.id}
                        part={part}
                        stageIndex={stage.stageIndex}
                    />
                ))}
            </div>
        </div>
    );
};

const Part = ({
    part,
    stageIndex,
}: {
    part: RocketPart;
    stageIndex: number;
}) => {
    const { highlightPartId } = useContext(RocketContext);
    const protPart = RocketPartPrototypes.find((x) => x.name === part.name);
    if (!protPart) return "Part details not found: " + part.name;

    return (
        <div
            className={cn(
                "flex items-center justify-between pl-4 border-t text-sm transition-colors",
                {
                    "bg-zinc-300 rounded-lg": highlightPartId === part.id,
                }
            )}
        >
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
                <PartActionsPopover part={part} stageIndex={stageIndex} />
            </div>
        </div>
    );
};

const PartActionsPopover = ({
    part,
    stageIndex,
}: {
    part: RocketPart;
    stageIndex: number;
}) => {
    const { highlightPartId, setHighLightPartId } = useContext(RocketContext);
    const { rocket } = useContext(RocketContext);

    if (!rocket) return "";

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

                    <Button
                        variant={"outline"}
                        className="absolute right-0 h-5 p-1"
                        onClick={() => {
                            highlightPartId === part.id
                                ? setHighLightPartId("")
                                : setHighLightPartId(part.id);
                        }}
                    >
                        {part.id === highlightPartId ? "Hide" : "Show"}
                    </Button>
                </div>

                <Separator decorative />

                <div className="flex flex-col">
                    <span className="text-sm">Stage</span>
                    <div className="flex w-[60px]">
                        <PartStageIndexSelector
                            partId={part.id}
                            stageIndex={stageIndex}
                            length={rocket.stages.length}
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export const StageIndexSelector = ({
    length,
    index,
    stageId,
}: {
    length: number;
    index: number;
    stageId: string;
}) => {
    const [selectedIndex, setSelectedIndex] = useState(index.toString());
    const { updateStageIndex } = useContext(RocketContext);

    const arrayFromZeroToN = Array.from({ length: length }, (_, index) =>
        index.toString()
    );

    const onValueChange = (value: string) => {
        updateStageIndex({ stageId, index: parseInt(value) });

        setSelectedIndex(value);
    };

    return (
        <Select value={selectedIndex} onValueChange={onValueChange}>
            <SelectTrigger className="p-1 h-6">
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {arrayFromZeroToN.map((value) => (
                    <SelectItem key={stageId + "_" + value} value={value}>
                        {parseInt(value) + 1}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export const PartStageIndexSelector = ({
    length,
    stageIndex,
    partId,
}: {
    length: number;
    stageIndex: number;
    partId: string;
}) => {
    const [selectedIndex, setSelectedIndex] = useState(stageIndex.toString());
    const { updatePartStage } = useContext(RocketContext);

    const arrayFromZeroToN = Array.from({ length: length }, (_, index) =>
        index.toString()
    );

    const onValueChange = (value: string) => {
        updatePartStage({ partId, stageIndex: parseInt(value) });

        setSelectedIndex(value);
    };

    return (
        <Select value={selectedIndex} onValueChange={onValueChange}>
            <SelectTrigger className="p-1 h-6">
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {arrayFromZeroToN.map((value) => (
                    <SelectItem key={partId + "_" + value} value={value}>
                        {parseInt(value) + 1}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default RocketStages;
