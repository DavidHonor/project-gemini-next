function partScaleChanged(ship: any, partScale: number, uniqueId: string) {
    const shipCopy = structuredClone(ship);

    outerLoop: for (let i = 0; i < shipCopy.stages.length; i++) {
        for (let j = 0; j < shipCopy.stages[i].length; j++) {
            if (shipCopy.stages[i][j].uniqueId === uniqueId) {
                shipCopy.stages[i][j].scale = partScale;

                let width_change =
                    shipCopy.stages[i][j].scaled_width -
                    shipCopy.stages[i][j].width *
                        shipCopy.scaleSlider *
                        partScale;

                let height_change =
                    shipCopy.stages[i][j].scaled_height -
                    shipCopy.stages[i][j].height *
                        shipCopy.scaleSlider *
                        partScale;

                shipCopy.stages[i][j].scaled_width =
                    shipCopy.stages[i][j].width *
                    shipCopy.scaleSlider *
                    partScale;
                shipCopy.stages[i][j].scaled_height =
                    shipCopy.stages[i][j].height *
                    shipCopy.scaleSlider *
                    partScale;

                shipCopy.stages[i][j].x += width_change / 2;
                shipCopy.stages[i][j].y += height_change / 2;

                //setShip(shipCopy);

                break outerLoop;
            }
        }
    }
}
