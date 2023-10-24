import React, { useContext } from "react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { RocketContext } from "./RocketContext";

interface PrototypePartCardProps {
    part: {
        name: string;
        image: string | undefined;
    };
}

const PrototypePartCard = ({ part }: PrototypePartCardProps) => {
    const { createRocketPart } = useContext(RocketContext);

    return (
        <Card
            className="hover:bg-zinc-300 hover:cursor-pointer mt-2"
            onClick={() => createRocketPart(part.name)}
        >
            <CardContent className="pt-2">
                <div className="flex flex-row justify-between">
                    <div className="flex items-center justify-center">
                        <Image
                            alt={part.name}
                            width={100}
                            height={100}
                            src={`/rocket_parts/${part.image}`}
                        />
                    </div>
                    <div className="flex items-center justify-center text-zinc-500 font-semibold">
                        {part.name}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PrototypePartCard;
