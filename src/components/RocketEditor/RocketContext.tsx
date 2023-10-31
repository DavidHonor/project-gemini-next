"use client";

import { trpc } from "@/app/_trpc/client";
import { ReactNode, createContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import type { RocketPart } from "@prisma/client";
import { Rocket } from "@/types/rocket";
import { CursorOptions, EditorMenuOptions } from "@/lib/utils";
import { rocketScaleChanged, partScaleChanged } from "@/lib/ship_functions";

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

    createRocketPart: (partName: string) => {},
    updatePartPosition: (rocketPart: RocketPart) => {},
    updatePartScale: (partScale: number, partId: string) => {},
    updatePartStage: (partId: string) => {},
    deletePart: (rocketPart: RocketPart) => {},

    setCursorMode: (cursorMode: CursorOptions) => {},
    setMenuOption: (menuOption: EditorMenuOptions) => {},
    setRocketPartIdDrag: (partId: string) => {},

    rocket: null as Rocket | null,
    isLoading: false,
    rocketPartIdDrag: "",
    cursorMode: CursorOptions.GRAB,
    menuOption: EditorMenuOptions.PARTS,
});

export const RocketContextProvider = ({ rocketId, children }: Props) => {
    const [rocket, setRocket] = useState<Rocket | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //rocketPartIdDrag stores a partId which was selected from the next parts list
    //to enable the dragging effect after the it was created on the server
    //should be cleared after the desired effect, as it is blocking functinality
    const [rocketPartIdDrag, setRocketPartIdDrag] = useState("");

    const [cursorMode, setCursorMode_] = useState<CursorOptions>(
        CursorOptions.GRAB
    );
    const [menuOption, setMenuOption] = useState<EditorMenuOptions>(
        EditorMenuOptions.PARTS
    );

    const utils = trpc.useContext();
    const { toast } = useToast();

    const handleAPIError = () =>
        toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
        });

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

    const updatePartStage = useMutation(async (partId: string) => {});

    const { mutate: updatePartScale_ } = useMutation({
        mutationFn: async ({
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
        },
    });
    const setCursorMode = (newCursorMode: CursorOptions) =>
        setCursorMode_(newCursorMode);

    const updatePartScale = (partScale: number, partId: string) =>
        updatePartScale_({ partScale, partId });

    return (
        <RocketContext.Provider
            value={{
                rocket,
                isLoading,
                rocketPartIdDrag,
                cursorMode,
                menuOption,
                updatePartPosition: updatePartPosition.mutate,
                createRocketPart: createRocketPart.mutate,
                getRocket: getRocketMutation.mutate,
                setCursorMode,
                updateRocketScale: updateRocketScale.mutate,
                updatePartScale,
                deletePart: deletePart.mutate,
                uploadRocketPreview: uploadRocketPreview.mutate,
                getRocketPreview: getRocketPreview.mutate,
                setMenuOption,
                addRocketStage: addRocketStage.mutate,
                updatePartStage: updatePartStage.mutate,
                setRocketPartIdDrag,
            }}
        >
            {children}
        </RocketContext.Provider>
    );
};
