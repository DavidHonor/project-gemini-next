import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";
import { MouseEvent } from "react";
import { Rocket } from "@/types/rocket";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
    if (typeof window !== "undefined") return path;
    if (process.env.VERCEL_URL)
        return `https://${process.env.VERCEL_URL}${path}`;

    return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function constructMetadata({
    title = "Project gemini - a rocket builder",
    description = "Project gemini is a software to make building a rocket easy.",
    image = "/thumbnail.png",
    icons = "/favicon.ico",
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@elonmusk",
        },
        icons,
        metadataBase: new URL("https://quill-lime.vercel.app"),
        themeColor: "#FFF",
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}

export function getCursorPosition<T extends Element>(event: MouseEvent<T>) {
    if (!event) return null;

    console.log(event.clientX, event.clientY);
}

export function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export enum CursorOptions {
    GRAB,
    SELECT,
}

export function roundToDecimalPlaces(num: number, places: number): number {
    const factor = Math.pow(10, places);
    return Math.round(num * factor) / factor;
}

function getRootPart(rocket: Rocket) {
    let rootPart = null; //part with oldest uniqueId
    for (let i = 0; i < rocket.stages.length; i++) {
        for (let j = 0; j < rocket.stages[i].parts.length; j++) {
            if (rootPart === null) {
                rootPart = rocket.stages[i].parts[j];
            }

            if (
                rootPart !== null &&
                new Date(rootPart.createdAt) >
                    new Date(rocket.stages[i].parts[j].createdAt)
            ) {
                rootPart = rocket.stages[i].parts[j];
            }
        }
    }
    return rootPart;
}

export function rocketScaleChanged(rocket: Rocket, scaleSliderValue: number) {
    const shipCopy = structuredClone(rocket);

    const oldScaleSlider = shipCopy.scaleSlider;
    shipCopy.scaleSlider = scaleSliderValue;

    const rootPart = getRootPart(shipCopy);
    if (!rootPart) return shipCopy; // Exit early if no root part found

    let rootPartCoords = { x: rootPart.x, y: rootPart.y };

    for (const stage of shipCopy.stages) {
        for (const part of stage.parts) {
            const partScale = part.scale;
            const partCoords = { x: part.x, y: part.y };

            const oldWidth = part.width * partScale * oldScaleSlider;
            const newWidth = part.width * partScale * scaleSliderValue;

            const oldHeight = part.height * partScale * oldScaleSlider;
            const newHeight = part.height * partScale * scaleSliderValue;

            const widthChange = oldWidth - newWidth;
            const heightChange = oldHeight - newHeight;

            // Adjusting position based on its own size change
            part.x += widthChange / 2;
            part.y += heightChange / 2;

            console.log(part.name, part.x);

            // If it's not the root part, adjust its position relative to the root
            if (part.id !== rootPart.id) {
                const relativeX = partCoords.x - rootPartCoords.x;
                const relativeY = partCoords.y - rootPartCoords.y;

                const unitX = relativeX / oldScaleSlider;
                const unitY = relativeY / oldScaleSlider;

                const newScaledX = rootPart.x + unitX * scaleSliderValue;
                const newScaledY = rootPart.y + unitY * scaleSliderValue;

                console.log(part.name, relativeX, newScaledX);

                part.x = newScaledX;
                part.y = newScaledY;
            }
        }
    }
    return shipCopy;
}
