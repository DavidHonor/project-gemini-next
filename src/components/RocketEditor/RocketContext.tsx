"use client";

import { trpc } from "@/app/_trpc/client";
import { ReactNode, createContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import type { RocketPart } from "@prisma/client";
import { Rocket } from "@/types/rocket";
import { CursorOptions } from "@/lib/utils";
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
    saveRocketScale: (newScale: number) => {},
    updatePartScale: (partScale: number, partId: string) => {},
    rocket: null as Rocket | null,
    isLoading: false,
    rocketPartIdDrag: "",
    cursorMode: CursorOptions.GRAB,
});

export const RocketContextProvider = ({ rocketId, children }: Props) => {
    const [rocket, setRocket] = useState<Rocket | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rocketPartIdDrag, setRocketPartIdDrag] = useState("");
    const [cursorMode, setCursorMode_] = useState<CursorOptions>(
        CursorOptions.GRAB
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

        setIsLoading(true);

        const rawResponse = await utils.client.updatePartPosition.mutate({
            rocketPart,
        });
        if (!rawResponse || !("id" in rawResponse)) {
            setIsLoading(false);
            handleAPIError();
            return;
        }

        const response = {
            ...rawResponse,
            createdAt: new Date(rawResponse.createdAt),
        };

        //update rocket with part
        const rocketClone = structuredClone(rocket);
        const stageIndex = rocketClone?.stages.findIndex(
            (x) => x.id === response.stageId
        );
        const partIndex = rocketClone?.stages[stageIndex!].parts.findIndex(
            (x) => x.id === response.id
        );

        rocketClone!.stages[stageIndex!].parts[partIndex!] = response;

        setRocket(rocketClone);
        setIsLoading(false);
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

    const { mutate: saveRocketScale_ } = useMutation({
        mutationFn: async ({ newScale }: { newScale: number }) => {
            if (rocket === null) return handleAPIError();

            const rocketCopy = rocketScaleChanged(rocket, newScale);

            setRocket(rocketCopy);

            utils.client.updateRocketScale
                .mutate({
                    rocketId,
                    scaleSlider: newScale,
                })
                .then((response) => {
                    console.log(response);
                });
        },
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

    const saveRocketScale = (newScale: number) =>
        saveRocketScale_({ newScale });

    const updatePartScale = (partScale: number, partId: string) =>
        updatePartScale_({ partScale, partId });

    return (
        <RocketContext.Provider
            value={{
                rocket,
                isLoading,
                rocketPartIdDrag,
                cursorMode,
                updatePartPosition: updatePartPosition.mutate,
                createRocketPart,
                getRocket: getRocketMutation.mutate,
                setCursorMode,
                saveRocketScale,
                updatePartScale,
            }}
        >
            {children}
        </RocketContext.Provider>
    );
};
