"use client";

import { trpc } from "@/app/_trpc/client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import RocketListItem from "./RocketListItem";

const RocketList = () => {
    const { data: rockets, isLoading } = trpc.getUserRockets.useQuery();

    return (
        <div className="max-h-[calc(100vh-3.5rem)] flex flex-col">
            <div className="flex w-full justify-center align-middle">
                <h2 className="mb-3 mt-3 font-bold text-3xl text-gray-900">
                    My rockets
                </h2>
            </div>
            {isLoading ? (
                <Skeleton className="h-16" />
            ) : (
                <div className="flex flex-col mt-5">
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
