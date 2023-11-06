"use client";

import { trpc } from "@/app/_trpc/client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import type { RocketPart } from "@prisma/client";
import { Rocket, RocketStage } from "@/types/rocket";
import { CursorOptions, EditorMenuOptions } from "@/lib/utils";
import { rocketScaleChanged, partScaleChanged } from "@/lib/ship_functions";
import { RocketStats } from "@/types/rocket_stats";
import { calculateRocketStats } from "../RocketStats/RocketStats";

interface Props {
    rocketId: string;
    children: ReactNode;
}

export const RocketContext = createContext({
    getRocket: (rocketId: string) => {},
    getRocketPreview: () => {},
    uploadRocketPreview: (image: string) => {},
    updateRocketScale: (scale: number) => {},

    addRocketStage: () => {},
    updatePartStage: ({
        partId,
        stageIndex,
    }: {
        partId: string;
        stageIndex: number;
    }) => {},
    updateStageIndex: ({
        stageId,
        index,
    }: {
        stageId: string;
        index: number;
    }) => {},

    createRocketPart: (partName: string) => {},
    updatePartPosition: (rocketPart: RocketPart) => {},
    updatePartScale: ({
        partScale,
        partId,
    }: {
        partScale: number;
        partId: string;
    }) => {},
    deletePart: (rocketPart: RocketPart) => {},

    setCursorMode: (cursorMode: CursorOptions) => {},
    setMenuOption: (menuOption: EditorMenuOptions) => {},
    setRocketPartIdDrag: (partId: string) => {},
    setHighLightPartId: (partId: string) => {},

    rocket: null as Rocket | null,
    stats: null as RocketStats | null,
    isLoading: false,
    rocketPartIdDrag: "",
    highlightPartId: "",

    cursorMode: CursorOptions.GRAB,
    menuOption: EditorMenuOptions.PARTS,
});

export const RocketContextProvider = ({ rocketId, children }: Props) => {
    const [rocket, setRocket] = useState<Rocket | null>(null);
    const [stats, setStats] = useState<RocketStats | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //rocketPartIdDrag stores a partId which was selected from the next parts list
    //to enable the dragging effect after the it was created on the server
    //should be cleared after the desired effect, as it is blocking functinality
    const [rocketPartIdDrag, setRocketPartIdDrag] = useState("");
    const [highlightPartId, setHighLightPartId] = useState("");

    const [cursorMode, setCursorMode] = useState<CursorOptions>(
        CursorOptions.GRAB
    );
    const [menuOption, setMenuOption] = useState<EditorMenuOptions>(
        EditorMenuOptions.PARTS
    );

    const utils = trpc.useContext();
    const { toast } = useToast();

    useEffect(() => {
        if (rocket) {
            const result = calculateRocketStats(rocket);
            setStats(result);
        }
    }, [rocket]);

    const handleAPIError = () =>
        toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
        });

    //========================================
    //=========== Rocket mutations ===========
    //========================================

    const getRocketMutation = useMutation(async (rocketId: string) => {
        const response = await utils.client.rocket.getRocket.query({
            rocketId,
        });
        if (!response) {
            handleAPIError();
            return;
        }

        const parsedResponse: Rocket = {
            ...response,
            createdAt: new Date(response.createdAt),
            stages: response.stages.map((stage) => ({
                ...stage,
                createdAt: new Date(stage.createdAt),
                parts: stage.parts.map((part) => ({
                    ...part,
                    createdAt: new Date(part.createdAt),
                })),
            })),
        };

        setRocket(parsedResponse);
    });

    const updateRocketScale = useMutation(async (scale: number) => {
        if (rocket === null) return handleAPIError();

        const rocketCopy = rocketScaleChanged(rocket, scale);

        setRocket(rocketCopy);

        utils.client.rocket.updateRocketScale
            .mutate({
                rocket: rocketCopy,
                scaleSlider: scale,
            })
            .then((response) => {
                console.log(response);
            });
    });

    const uploadRocketPreview = useMutation(async (image: string) => {
        if (!rocket) return handleAPIError();

        utils.client.rocket.uploadRocketPreview.mutate({
            image: image,
            rocketId: rocket.id,
        });
    });

    const getRocketPreview = useMutation(async () => {
        if (!rocketId) return handleAPIError();

        utils.client.rocket.getRocketPreview.query({ rocketId });
    });

    //========================================
    //=========== Stage mutations ===========
    //========================================

    const addRocketStage = useMutation(async () => {
        if (!rocketId) return handleAPIError();

        const response = await utils.client.stage.addRocketStage.mutate({
            rocketId,
        });

        if (!("id" in response)) return handleAPIError();
        const newStage = {
            ...response,
            createdAt: new Date(response.createdAt),
            parts: response.parts.map((part) => ({
                ...part,
                createdAt: new Date(part.createdAt),
            })),
        };

        const rocketCopy = structuredClone(rocket);
        rocketCopy?.stages.push(newStage);
        setRocket(rocketCopy);
    });

    const updatePartStage = useMutation(
        async ({
            partId,
            stageIndex,
        }: {
            partId: string;
            stageIndex: number;
        }) => {
            if (!rocket) return handleAPIError();

            const response = await utils.client.stage.updatePartStage.mutate({
                rocketId,
                partId,
                stageIndex,
            });

            if (!("status" in response)) return handleAPIError();

            getRocketMutation.mutate(rocketId);
        }
    );

    const updateStageIndex = useMutation(
        async ({ stageId, index }: { stageId: string; index: number }) => {
            if (index < 0) throw new Error("cant move stage index below zero");

            const response = await utils.client.stage.updateStageIndex.mutate({
                rocketId,
                stageId,
                index,
            });

            if (!("status" in response)) return handleAPIError();

            getRocketMutation.mutate(rocketId);
        }
    );

    //========================================
    //=========== Part mutations ===========
    //========================================

    const createRocketPart = useMutation(async (partName: string) => {
        if (!rocket) return handleAPIError();

        const response = await utils.client.part.createRocketPart.mutate({
            rocketId: rocket.id,
            partName,
        });
        if (!response || !("id" in response)) return handleAPIError();

        setRocketPartIdDrag(response.id);
        getRocketMutation.mutate(rocketId);
    });

    const deletePart = useMutation(async (rocketPart: RocketPart) => {
        if (!rocket) return handleAPIError();

        const stageIndex = rocket.stages.findIndex(
            (x) => x.id === rocketPart.stageId
        );
        const partIndex = rocket.stages[stageIndex].parts.findIndex(
            (x) => x.id === rocketPart.id
        );

        const rocketCopy = structuredClone(rocket);
        rocketCopy.stages[stageIndex].parts.splice(partIndex, 1);
        setRocket(rocketCopy);

        utils.client.part.deletePart.mutate({
            partId: rocketPart.id,
        });
    });

    const updatePartPosition = useMutation(async (rocketPart: RocketPart) => {
        if (!rocketPart) return handleAPIError();

        const rocketClone = structuredClone(rocket);
        const stageIndex = rocketClone?.stages.findIndex(
            (x) => x.id === rocketPart.stageId
        );
        const partIndex = rocketClone?.stages[stageIndex!].parts.findIndex(
            (x) => x.id === rocketPart.id
        );

        rocketClone!.stages[stageIndex!].parts[partIndex!] = rocketPart;
        setRocket(rocketClone);

        utils.client.part.updatePartPosition
            .mutate({
                rocketPart,
            })
            .then((response) => {
                if (!response || !("id" in response)) {
                    handleAPIError();
                }
            })
            .catch((err) => handleAPIError());
    });

    const updatePartScale = useMutation(
        async ({
            partScale,
            partId,
        }: {
            partScale: number;
            partId: string;
        }) => {
            if (rocket === null || rocket.id === null) return handleAPIError();

            const partScaleResult = partScaleChanged(rocket, partScale, partId);
            setRocket(partScaleResult.updatedRocket);

            const response = await utils.client.part.updatePartScale.mutate({
                part: partScaleResult.updatedPart,
            });
        }
    );

    return (
        <RocketContext.Provider
            value={{
                rocket,
                stats,
                isLoading,
                rocketPartIdDrag,
                highlightPartId,
                cursorMode,
                menuOption,

                getRocket: getRocketMutation.mutate,
                updateRocketScale: updateRocketScale.mutate,
                getRocketPreview: getRocketPreview.mutate,

                addRocketStage: addRocketStage.mutate,
                updateStageIndex: updateStageIndex.mutate,
                updatePartStage: updatePartStage.mutate,

                updatePartScale: updatePartScale.mutate,
                deletePart: deletePart.mutate,
                uploadRocketPreview: uploadRocketPreview.mutate,
                createRocketPart: createRocketPart.mutate,
                updatePartPosition: updatePartPosition.mutate,

                setMenuOption,
                setCursorMode,
                setRocketPartIdDrag,
                setHighLightPartId,
            }}
        >
            {children}
        </RocketContext.Provider>
    );
};
