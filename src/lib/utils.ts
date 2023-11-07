import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";
import { MouseEvent } from "react";

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

export enum EditorMenuOptions {
    PARTS,
    STAGES,
    PERFORMANCE,
}

export function roundToDecimalPlaces(num: number, places: number = 0): number {
    const factor = Math.pow(10, places);
    return Math.round(num * factor) / factor;
}

export function degreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180);
}

export function radiansToDegrees(radians: number) {
    return radians * (180 / Math.PI);
}

export function normalizeToSurface(
    x: number,
    y: number,
    altitude: number,
    radius: number
) {
    // Calculate current distance from Earth's center
    const currentDistance = Math.sqrt(x ** 2 + y ** 2);

    // Calculate the scale factor to normalize the vector (x, y) to the Earth's surface
    const scaleFactor = (currentDistance - altitude) / currentDistance;

    return {
        x: x * scaleFactor,
        y: y * scaleFactor,
    };
}

export function calculateCircumferenceDistance(
    pointA: { x: number; y: number },
    pointB: { x: number; y: number },
    radius: number
): number {
    const angleA = Math.atan2(pointA.y, pointA.x);
    const angleB = Math.atan2(pointB.y, pointB.x);

    // Find the difference in angles, considering the clockwise direction
    let deltaAngle = angleA - angleB;

    // If the angle is negative, we need to add 2 * PI to get the clockwise angle
    if (deltaAngle < 0) {
        deltaAngle += 2 * Math.PI;
    }

    // The arc length is the angle in radians multiplied by the radius of the circle
    const arcLength = deltaAngle * radius;

    return arcLength;
}
