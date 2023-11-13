import { Rocket } from "@/types/rocket";
import { toPng } from "html-to-image";
import React, { useContext, useEffect, useRef } from "react";
import { RocketContext } from "./RocketContext";

interface imageUploadProps {
    editorRef: React.RefObject<HTMLDivElement>;
    rocket: Rocket;
}
export const imageUpload = ({ editorRef, rocket }: imageUploadProps) => {
    const { uploadRocketPreview } = useContext(RocketContext);
    const uploadTimeoutRef = useRef<any>();

    const captureRocketImage = async () => {
        if (!editorRef || !editorRef.current) return;

        const dataUrl = await toPng(editorRef.current, { cacheBust: true });
        return dataUrl;
    };

    const uploadRocketImage = async () => {
        const img = await captureRocketImage();
        if (img && img.includes("data:image/png;base64"))
            uploadRocketPreview(img);
    };

    useEffect(() => {
        if (rocket && rocket.stages) {
            if (uploadTimeoutRef.current) {
                clearTimeout(uploadTimeoutRef.current);
            }

            uploadTimeoutRef.current = setTimeout(() => {
                uploadRocketImage();
            }, 1000);

            return () => {
                if (uploadTimeoutRef.current) {
                    clearTimeout(uploadTimeoutRef.current);
                }
            };
        }
    }, [rocket]);

    return {};
};
