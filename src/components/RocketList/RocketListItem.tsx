import { RocketName } from "@/types/rocket";
import React from "react";
import { Icons } from "../Icons";
import { redirect } from "next/navigation";
import Link from "next/link";

interface RocketItemListProps {
    rocket: RocketName;
}

const RocketListItem = ({ rocket }: RocketItemListProps) => {
    return (
        <div className="flex flex-row w-full h-6">
            <div className="flex">
                <Icons.rocket className="w-5 h-5" />
            </div>
            <div className="flex flex-1 hover:underline hover:cursor-pointer">
                <Link href={`/dashboard/${rocket.id}`}>
                    {new Date(rocket.createdAt).toLocaleTimeString() +
                        " stages: " +
                        rocket.stages.length}
                </Link>
            </div>
        </div>
    );
};

export default RocketListItem;
