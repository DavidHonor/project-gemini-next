import { RocketName } from "@/types/rocket";
import React from "react";
import { Icons } from "../Icons";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/app/_trpc/client";
import Skeleton from "react-loading-skeleton";
import { Card } from "../ui/card";

interface RocketItemListProps {
    rocket: RocketName;
}

const RocketListItem = ({ rocket }: RocketItemListProps) => {
    const { data: imageResponse, isLoading } = trpc.getRocketPreview.useQuery({
        rocketId: rocket.id,
    });

    function procImg() {
        if (!imageResponse || imageResponse === undefined) return "";
        if (!("url" in imageResponse)) return "";

        return imageResponse.url;
    }

    const imageUrl = procImg();

    return (
        <Card className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 hover:cursor-pointer group w-[300px]">
            <Link href={`/dashboard/${rocket.id}`}>
                <div className="mb-2 text-center group-hover:underline text-zinc-700 font-semibold">
                    {new Date(rocket.createdAt).toLocaleDateString()}
                </div>
                <div className="mb-2 text-sm text-center text-gray-500">
                    Stages: {rocket.stages.length}
                </div>

                <div className="border border-zinc-200 p-2">
                    {isLoading ? (
                        <Skeleton
                            height={100}
                            width={100}
                            className="rounded-full"
                        />
                    ) : (
                        <Image
                            alt={"rocket_" + rocket.id}
                            src={imageUrl}
                            width={100}
                            height={100}
                        />
                    )}
                </div>
            </Link>
        </Card>
    );
};

export default RocketListItem;
