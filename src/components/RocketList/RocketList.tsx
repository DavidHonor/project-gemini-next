"use client";

import { trpc } from "@/app/_trpc/client";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import RocketListItem from "./RocketListItem";
import { Ban, Loader2, Rocket } from "lucide-react";

import { useToast } from "../ui/use-toast";
import CreateRocketDialog from "../Dialogs/CreateRocketDialog/CreateRocketDialog";

const RocketList = () => {
    const {
        data: rockets,
        isLoading: rocketsLoading,
        refetch,
    } = trpc.rocket.getUserRockets.useQuery();

    const {
        mutate: createRocket,
        data: rocket,
        isLoading: isRocketLoading,
        status,
    } = trpc.rocket.createRocket.useMutation();

    const { toast } = useToast();

    useEffect(() => {
        if (status === "loading") {
            toast({
                title: "Creating your rocket",
                description: "It should take a couple of seconds.",
                action: (
                    <div>
                        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
                    </div>
                ),
            });
        } else if (status === "error") {
            toast({
                title: "Rocket creation error",
                description: "An error has occured while creating your rocket",
                action: (
                    <div>
                        <Ban className="h-8 w-8 text-red-800" />
                    </div>
                ),
            });
        } else if (status === "success") {
            refetch();
        }
    }, [status]);

    if (rocketsLoading)
        return (
            <div className="max-h-[calc(100vh-3.5rem)] flex flex-col">
                <div className="flex w-full justify-between items-center px-2">
                    <div className="text-center flex-grow">
                        <h2 className="mb-3 mt-3 font-bold text-3xl text-gray-900">
                            My rockets
                        </h2>
                    </div>
                </div>
                <Skeleton className="h-16" />
            </div>
        );

    return (
        <div className="max-h-[calc(100vh-3.5rem)] flex flex-col">
            <div className="flex w-full justify-center items-center relative py-2">
                <h2 className="font-bold text-3xl text-gray-900">My rockets</h2>
                <div className={"absolute right-0"}>
                    <CreateRocketDialog
                        noRockets={rockets!.length}
                        createRocket={createRocket}
                    />
                </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start mt-5 gap-3">
                {!rockets?.length ? (
                    <div className="flex justify-center w-full gap-x-1">
                        <span className="text-lg font-semibold">
                            It&#39;s empty here, create your first rocket
                        </span>
                        <Rocket className="w-7 h-7 " />
                    </div>
                ) : null}
                {rockets?.map((rocket, index) => (
                    <RocketListItem
                        index={index}
                        key={rocket.createdAt}
                        rocket={rocket!}
                        onRocketDeleted={refetch}
                    />
                ))}
            </div>
        </div>
    );
};

export default RocketList;
