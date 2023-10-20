"use client";

import { trpc } from "@/app/_trpc/client";
import { ReactNode, createContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import type { RocketPart } from "@prisma/client";
import { Rocket } from "@/types/rocket";

interface Props {
    rocketId: string;
    children: ReactNode;
}

export const RocketContext = createContext({
    saveRocketPart: (rocketPart: RocketPart | null) => {},
    createRocketPart: (partName: string) => {},
    getRocket: (rocketId: string) => {},
    rocket: null as Rocket | null,
    isLoading: false,
    rocketPartIdDrag: "",
});

export const RocketContextProvider = ({ rocketId, children }: Props) => {
    const [rocket, setRocket] = useState<Rocket | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rocketPartIdDrag, setRocketPartIdDrag] = useState("");

    const utils = trpc.useContext();

    const { toast } = useToast();

    const { mutate: getRocket_ } = useMutation({
        mutationFn: async ({ rocketId }: { rocketId: string }) => {
            const response = await utils.client.getUserRocket.query({
                rocketId,
            });

            if (!response)
                return toast({
                    title: "Something went wrong",
                    description: "Please try again later",
                    variant: "destructive",
                });

            setRocket(response);
        },
    });

    const { mutate: saveRocketPart_ } = useMutation({
        mutationFn: async ({
            rocketPart,
        }: {
            rocketPart: RocketPart | null;
        }) => {
            if (rocketPart === null)
                return toast({
                    title: "Something went wrong",
                    description: "No rocketPart provided",
                    variant: "destructive",
                });

            if (rocketPartIdDrag !== "") {
                setRocketPartIdDrag("");
            }

            const response = await utils.client.saveRocketPart.mutate({
                rocketPart: rocketPart,
            });

            if (!response)
                return toast({
                    title: "Something went wrong",
                    description: "Please try again later",
                    variant: "destructive",
                });

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

    const saveRocketPart = (rocketPart: RocketPart | null) =>
        saveRocketPart_({ rocketPart });
    const createRocketPart = (partName: string) =>
        createRocketPart_({ partName });
    const getRocket = (rocketId: string) => {
        getRocket_({ rocketId });
    };

    return (
        <RocketContext.Provider
            value={{
                rocket,
                isLoading,
                rocketPartIdDrag,
                saveRocketPart,
                createRocketPart,
                getRocket,
            }}
        >
            {children}
        </RocketContext.Provider>
    );
};
