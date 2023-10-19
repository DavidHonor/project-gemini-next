"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

import { useRef, useEffect, useState } from "react";
import { useInView, InView } from "react-intersection-observer";

interface RocketPartImgProps {
    imageSource: string;
    alt: string;
    width: number;
    height: number;
    description: string;
}

const RocketPartImg = ({
    imageSource,
    alt,
    width,
    height,
    description,
}: RocketPartImgProps) => {
    const { ref, inView, entry } = useInView({
        threshold: 1,
        fallbackInView: true,
    });

    return (
        <div
            className={cn(
                `flex justify-center w-[300px] transition-all duration-300 p-2 lg:p-4`,
                {
                    "ease-in rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl w-[600px] flex-row justify-between":
                        inView,

                    "ease-out": !inView,
                }
            )}
            ref={ref}
        >
            <Image src={imageSource} alt={alt} width={width} height={height} />

            {inView ? (
                <div className="w-[250px] flex items-center justify-center text-center">
                    <p className="max-w-prose text-zinc-700 sm:text-lg">
                        {description}
                    </p>
                </div>
            ) : null}
        </div>
    );
};

export default RocketPartImg;
