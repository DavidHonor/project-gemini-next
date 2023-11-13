import React, { useContext } from "react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { RocketContext } from "../RocketEditor/RocketContext";
import { PartTypes, RocketPartPrototypes } from "@/config/rocket_parts";
import { fuelMassCalc } from "@/lib/ship_functions";
import { roundToDecimalPlaces } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface PrototypePartCardProps {
    part: {
        name: string;
        image: string | undefined;
    };
}

const PrototypePartCard = ({ part }: PrototypePartCardProps) => {
    const { createRocketPart } = useContext(RocketContext);
    const protPart = RocketPartPrototypes.find((x) => x.name === part.name);
    if (!protPart) return <p>{"Part not found: " + part.name}</p>;
    if (!protPart.diameter && protPart.part_type === PartTypes.FUELTANK)
        return <p>{part.name + " diameter not found"}</p>;

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
                            width="0"
                            height="0"
                            sizes="100vw"
                            className="w-auto h-[80px]"
                            src={`/rocket_parts/${part.image}`}
                        />
                    </div>
                    <div className="flex flex-col gap-0.5 items-end">
                        <span className="text-base">{part.name}</span>

                        <Separator />

                        <span className="text-xs">
                            {`Mass - ${protPart.weight} kg`}
                        </span>

                        {protPart.part_type === PartTypes.FUELTANK &&
                        protPart.diameter ? (
                            <span className="text-xs">
                                {`Wet mass - ${roundToDecimalPlaces(
                                    fuelMassCalc(protPart),
                                    0
                                )} kg`}
                            </span>
                        ) : null}

                        {protPart.part_type === PartTypes.ENGINE ? (
                            <>
                                <span className="text-xs">
                                    {`Thrust - ${protPart.thrust_sl} kN`}
                                </span>
                                <span className="text-xs">
                                    {`Isp - ${protPart.isp_sl} s`}
                                </span>
                            </>
                        ) : null}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PrototypePartCard;
