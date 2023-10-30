import { RocketName } from "@/types/rocket";
import React, { useEffect } from "react";
import { Icons } from "../Icons";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/app/_trpc/client";
import Skeleton from "react-loading-skeleton";
import { Card } from "../ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { Loader2, Trash } from "lucide-react";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";

interface RocketItemListProps {
    rocket: RocketName;
    onRocketDeleted: () => void;
}

const RocketListItem = ({ rocket, onRocketDeleted }: RocketItemListProps) => {
    const { data: imageResponse, isLoading } = trpc.getRocketPreview.useQuery({
        rocketId: rocket.id,
    });

    const { mutate: deleteRocket, status: deleteRocketStatus } =
        trpc.deleteRocket.useMutation();

    useEffect(() => {
        if (deleteRocketStatus === "loading") {
            const rocketName = rocket.name;
            toast({
                title: "Deleting " + rocketName,
                description: "It should take a couple of seconds.",
                action: (
                    <div>
                        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
                    </div>
                ),
            });
        } else if (deleteRocketStatus === "success") onRocketDeleted();
    }, [deleteRocketStatus]);

    const procImg = () => {
        if (!imageResponse || !("url" in imageResponse)) {
            return "/empty_rocket.png";
        }

        return imageResponse.url;
    };

    return (
        <Card className="flex flex-col w-[250px] sm:w-[300px] items-center p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 hover:cursor-pointer group">
            <Link
                href={`/dashboard/${rocket.id}`}
                className="w-full flex flex-col gap-1"
            >
                <div className="text-md text-center group-hover:underline text-zinc-700 font-semibold relative">
                    {rocket.name}
                    <Button
                        variant={"ghost"}
                        className="absolute right-0 top-0 p-2"
                        onClick={(e) => {
                            e.preventDefault();
                            deleteRocket({ rocketId: rocket.id });
                        }}
                    >
                        <Trash className="w-5 h-5" />
                    </Button>
                </div>

                <div className="text-sm text-center text-gray-600 group-hover:underline">
                    {new Date(rocket.createdAt).toLocaleDateString()}
                </div>

                <div className="text-sm text-center text-gray-500">
                    Stages: {rocket.stages.length}
                </div>

                <div className="flex items-center justify-center ">
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
                                src={procImg()}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="w-auto h-[100px]"
                            />
                        )}
                    </div>
                </div>
            </Link>
        </Card>
    );
};

export default RocketListItem;
