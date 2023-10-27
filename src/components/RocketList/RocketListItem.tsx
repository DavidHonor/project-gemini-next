import { RocketName } from "@/types/rocket";
import React from "react";
import { Icons } from "../Icons";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/app/_trpc/client";
import Skeleton from "react-loading-skeleton";

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
        <div className="flex flex-row w-full h-6">
            <div className="flex">
                <Icons.rocket className="w-5 h-5" />
            </div>
            <div className="flex flex-1 gap-1 hover:underline hover:cursor-pointer">
                <Link href={`/dashboard/${rocket.id}`}>
                    {new Date(rocket.createdAt).toLocaleTimeString() +
                        " stages: " +
                        rocket.stages.length}
                    <div className="h-[100px] w-[100px]">
                        {isLoading ? (
                            <Skeleton height={100} />
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
            </div>
        </div>
    );
};

export default RocketListItem;
