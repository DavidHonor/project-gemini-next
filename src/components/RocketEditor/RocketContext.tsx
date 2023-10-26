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
    saveRocketPart: (rocketPart: RocketPart | null) => {},
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

    const { mutate: getRocket_ } = useMutation({
        mutationFn: async ({ rocketId }: { rocketId: string }) => {
            const rawResponse = await utils.client.getUserRocket.query({
                rocketId,
            });

            if (!rawResponse)
                return toast({
                    title: "Something went wrong",
                    description: "Please try again later",
                    variant: "destructive",
                });

            //convert the strings to actual dates
            const response: Rocket = {
                ...rawResponse,
                createdAt: new Date(rawResponse.createdAt),
                stages: rawResponse.stages.map((stage) => ({
                    ...stage,
                    createdAt: new Date(stage.createdAt),
                    parts: stage.parts.map((part) => ({
                        ...part,
                        createdAt: new Date(part.createdAt),
                    })),
                })),
            };

            setRocket(response);
        },
    });

    const { mutate: saveRocketPart_ } = useMutation({
        mutationFn: async ({
            rocketPart,
        }: {
            rocketPart: RocketPart | null;
        }) => {
            setIsLoading(true);
            if (rocketPart === null)
                return toast({
                    title: "Something went wrong",
                    description: "No rocketPart provided",
                    variant: "destructive",
                });

            if (rocketPartIdDrag !== "") {
                setRocketPartIdDrag("");
            }

            const rawResponse = await utils.client.saveRocketPart.mutate({
                rocketPart: rocketPart,
            });

            if (!rawResponse)
                return toast({
                    title: "Something went wrong",
                    description: "Please try again later",
                    variant: "destructive",
                });

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
        },
    });

    const { mutate: createRocketPart_ } = useMutation({
        mutationFn: async ({ partName }: { partName: string }) => {
            if (!rocket || !rocket.id)
                return toast({
                    title: "Something went wrong",
                    description: "Please try again later",
                    variant: "destructive",
                });

            const response = await utils.client.createRocketPart.mutate({
                rocketId: rocket.id,
                partName,
            });

            if (!response || !("id" in response))
                return toast({
                    title: "Something went wrong",
                    description: "Please try again later",
                    variant: "destructive",
                });

            setRocketPartIdDrag(response.id);
            getRocket_({ rocketId });
        },
    });

    const { mutate: saveRocketScale_ } = useMutation({
        mutationFn: async ({ newScale }: { newScale: number }) => {
            if (rocket === null)
                return toast({
                    title: "Something went wrong",
                    description: "Please try again later",
                    variant: "destructive",
                });

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
            if (rocket === null || rocket.id === null)
                return toast({
                    title: "Something went wrong",
                    description: "Please try again later",
                    variant: "destructive",
                });

            const partScaleResult = partScaleChanged(rocket, partScale, partId);
            setRocket(partScaleResult.updatedRocket);

            const response = await utils.client.updatePartScale.mutate({
                part: partScaleResult.updatedPart,
            });
        },
    });

    const saveRocketPart = (rocketPart: RocketPart | null) =>
        saveRocketPart_({ rocketPart });
    const createRocketPart = (partName: string) =>
        createRocketPart_({ partName });
    const getRocket = (rocketId: string) => {
        getRocket_({ rocketId });
    };
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
                saveRocketPart,
                createRocketPart,
                getRocket,
                setCursorMode,
                saveRocketScale,
                updatePartScale,
            }}
        >
            {children}
        </RocketContext.Provider>
    );
};
