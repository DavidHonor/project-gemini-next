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
    updatePartPosition: (rocketPart: RocketPart) => {},
    createRocketPart: (partName: string) => {},
    getRocket: (rocketId: string) => {},
    setCursorMode: (cursorMode: CursorOptions) => {},
    setMenuOption: (menuOption: EditorMenuOptions) => {},
    updateRocketScale: (scale: number) => {},
    updatePartScale: (partScale: number, partId: string) => {},
    deletePart: (rocketPart: RocketPart) => {},
    uploadRocketPreview: (image: string) => {},
    getRocketPreview: () => {},
    rocket: null as Rocket | null,
    isLoading: false,
    rocketPartIdDrag: "",
    cursorMode: CursorOptions.GRAB,
    menuOption: EditorMenuOptions.PARTS,
});

export const RocketContextProvider = ({ rocketId, children }: Props) => {
    const [rocket, setRocket] = useState<Rocket | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
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
        const response = await utils.client.getUserRocket.query({ rocketId });
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

        utils.client.updatePartPosition
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

    const { mutate: createRocketPart_ } = useMutation({
        mutationFn: async ({ partName }: { partName: string }) => {
            if (!rocket || !rocket.id) return handleAPIError();

            const response = await utils.client.createRocketPart.mutate({
                rocketId: rocket.id,
                partName,
            });

            if (!response || !("id" in response)) return handleAPIError();

            setRocketPartIdDrag(response.id);
            getRocketMutation.mutate(rocketId);
        },
    });

    const updateRocketScale = useMutation(async (scale: number) => {
        if (rocket === null) return handleAPIError();

        const rocketCopy = rocketScaleChanged(rocket, scale);

        setRocket(rocketCopy);

        utils.client.updateRocketScale
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

        utils.client.deletePart.mutate({
            partId: rocketPart.id,
        });
    });

    const uploadRocketPreview = useMutation(async (image: string) => {
        if (!rocket) return handleAPIError();

        utils.client.uploadRocketPreview.mutate({
            image: image,
            rocketId: rocket.id,
        });
    });

    const getRocketPreview = useMutation(async () => {
        if (!rocketId) return handleAPIError();

        utils.client.getRocketPreview.query({ rocketId });
    });

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

            const response = await utils.client.updatePartScale.mutate({
                part: partScaleResult.updatedPart,
            });
        },
    });

    const createRocketPart = (partName: string) =>
        createRocketPart_({ partName });
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
                createRocketPart,
                getRocket: getRocketMutation.mutate,
                setCursorMode,
                updateRocketScale: updateRocketScale.mutate,
                updatePartScale,
                deletePart: deletePart.mutate,
                uploadRocketPreview: uploadRocketPreview.mutate,
                getRocketPreview: getRocketPreview.mutate,
                setMenuOption,
            }}
        >
            {children}
        </RocketContext.Provider>
    );
};
