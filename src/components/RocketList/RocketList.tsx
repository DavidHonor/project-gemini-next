"use client";

import { trpc } from "@/app/_trpc/client";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import RocketListItem from "./RocketListItem";
import { Ban, Loader2, PlusSquareIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { useToast } from "../ui/use-toast";

const RocketList = () => {
    const { data: rockets, isLoading } = trpc.getUserRockets.useQuery();
    const {
        mutate,
        data: rocket,
        isLoading: isRocketLoading,
        status,
    } = trpc.createRocket.useMutation();

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
        }
    }, [status]);

    return (
        <div className="max-h-[calc(100vh-3.5rem)] flex flex-col">
            <div className="flex w-full justify-between items-center px-2">
                <div className="text-center flex-grow">
                    <h2 className="mb-3 mt-3 font-bold text-3xl text-gray-900">
                        My rockets
                    </h2>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger onClick={() => mutate()}>
                            <PlusSquareIcon />
                        </TooltipTrigger>
                        <TooltipContent>Create new rocket</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            {isLoading ? (
                <Skeleton className="h-16" />
            ) : (
                <div className="flex mt-5 gap-3">
                    {rockets?.map((rocket) => (
                        <RocketListItem
                            key={rocket.createdAt}
                            rocket={rocket!}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RocketList;
