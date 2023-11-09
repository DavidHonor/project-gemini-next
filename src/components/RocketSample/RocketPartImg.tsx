"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

import { useRef, useEffect, useState } from "react";
import { useInView, InView } from "react-intersection-observer";

interface RocketPartImgProps {
    imageSource: string;
    alt: string;
    lefty: boolean;
    description: string;
}

const RocketPartImg = ({
    imageSource,
    alt,
    lefty,
    description,
}: RocketPartImgProps) => {
    const { ref, inView } = useInView({
        threshold: 0.8,
        triggerOnce: true,
    });

    const height = 350;

    const ImgTextLayout = () => {
        if (lefty)
            return (
                <>
                    <Image
                        src={imageSource}
                        alt={alt}
                        width={"0"}
                        height={"0"}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className={`w-auto h-[200px] lg:h-[${height}px]`}
                    />

                    {inView && (
                        <div className="w-full lg:w-1/2">
                            <p className="text-gray-700 text-right sm:text-left sm:text-lg">
                                {description}
                            </p>
                        </div>
                    )}
                </>
            );
        return (
            <>
                {inView && (
                    <div className="w-full lg:w-1/2">
                        <p className="text-gray-700 text-left sm:text-left sm:text-lg">
                            {description}
                        </p>
                    </div>
                )}
                <Image
                    src={imageSource}
                    alt={alt}
                    width={"0"}
                    height={"0"}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={`w-auto h-[200px] lg:h-[${height}px]`}
                />
            </>
        );
    };

    return (
        <div
            className={`flex items-center justify-between transition-all duration-500 ease-in-out p-4 ${
                inView
                    ? "rounded-xl bg-gray-100 shadow-lg ring-1 ring-gray-300/50 lg:rounded-2xl"
                    : "rounded-xl bg-gray-100 shadow-lg ring-1 ring-gray-300/50 lg:rounded-2xl"
            }`}
            ref={ref}
            style={{
                maxWidth: inView ? "600px" : "250px",
            }}
        >
            {ImgTextLayout()}
        </div>
    );
};

export default RocketPartImg;
