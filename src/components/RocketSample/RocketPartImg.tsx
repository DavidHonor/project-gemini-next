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
    const { ref, inView } = useInView({
        threshold: 0.8,
        triggerOnce: false,
    });

    return (
        <div
            className={`flex flex-col lg:flex-row items-center justify-center w-full transition-all duration-500 ease-in-out p-4 ${
                inView
                    ? "rounded-xl bg-gray-100 shadow-lg ring-1 ring-gray-300/50 lg:rounded-2xl"
                    : ""
            }`}
            ref={ref}
            style={{
                maxWidth: inView ? "600px" : "300px",
            }}
        >
            <div className="w-full lg:w-1/2 h-auto flex justify-center">
                <Image
                    src={imageSource}
                    alt={alt}
                    width={"0"}
                    height={"0"}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="w-auto h-[150px] lg:h-[250px]"
                />
            </div>
            {inView && (
                <div className="mt-4 lg:mt-0 lg:ml-4 w-full lg:w-1/2">
                    <p className="text-gray-700 text-center sm:text-left sm:text-lg">
                        {description}
                    </p>
                </div>
            )}
        </div>
    );
};

export default RocketPartImg;
