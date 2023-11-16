import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";

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
    description = "Project gemini is a software to simulate your rocket trajectory",
    image = "/thumbnail.png",
    icons = "/favicon.png",
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
            creator: "",
        },
        icons,
        metadataBase: new URL("https://project-gemini-next.vercel.app/"),
        themeColor: "#FFF",
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}

export const getEventCoords = (
    editorAreaRef: React.RefObject<HTMLDivElement>,
    event:
        | React.MouseEvent<Element, MouseEvent>
        | React.TouchEvent<Element>
        | MouseEvent
        | TouchEvent,
    isTouchEnd: boolean = false
) => {
    if (!editorAreaRef.current) return;
    let x, y, button;

    if ("clientX" in event) {
        x = event.clientX;
        y = event.clientY;
        button = event.button;
    } else if ("touches" in event) {
        if (isTouchEnd) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
        } else {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        }
    } else return;

    const rect = editorAreaRef.current.getBoundingClientRect();
    x = x - rect.left;
    y = y - rect.top;

    return { x, y, button };
};

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

    let deltaAngle = angleA - angleB;

    if (deltaAngle < 0) {
        deltaAngle += 2 * Math.PI;
    }

    const arcLength = deltaAngle * radius;

    return arcLength;
}

export function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function executedFunction(...args: any[]) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
