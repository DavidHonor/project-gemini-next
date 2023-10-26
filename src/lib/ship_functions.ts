import { Rocket } from "@/types/rocket";

export function partScaleChanged(
    ship: Rocket,
    partScale: number,
    partId: string
) {
    const shipCopy = structuredClone(ship);
    let updatedPart = null;

    outerloop: for (let i = 0; i < shipCopy.stages.length; i++) {
        for (let j = 0; j < shipCopy.stages[i].parts.length; j++) {
            if (shipCopy.stages[i].parts[j].id === partId) {
                const part = shipCopy.stages[i].parts[j];
                const oldPartScale = part.scale;
                part.scale = partScale;

                const oldWidth = part.width * oldPartScale * ship.scaleSlider;
                const newWidth = part.width * partScale * ship.scaleSlider;

                const oldHeight = part.height * oldPartScale * ship.scaleSlider;
                const newHeight = part.height * partScale * ship.scaleSlider;

                const widthChange = oldWidth - newWidth;
                const heightChange = oldHeight - newHeight;

                part.x += widthChange / 2;
                part.y += heightChange / 2;

                updatedPart = structuredClone(part);

                break outerloop;
            }
        }
    }
    if (updatedPart === null) throw new Error("No part found!");

    return { updatedRocket: shipCopy, updatedPart };
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

            // If it's not the root part, adjust its position relative to the root
            if (part.id !== rootPart.id) {
                const relativeX = partCoords.x - rootPartCoords.x;
                const relativeY = partCoords.y - rootPartCoords.y;

                const unitX = relativeX / oldScaleSlider;
                const unitY = relativeY / oldScaleSlider;

                const newScaledX = rootPart.x + unitX * scaleSliderValue;
                const newScaledY = rootPart.y + unitY * scaleSliderValue;

                part.x = newScaledX;
                part.y = newScaledY;
            }
        }
    }
    return shipCopy;
}
