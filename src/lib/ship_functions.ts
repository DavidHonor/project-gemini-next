import {
    DefaultRockets,
    GRAVITY_SOURCE,
    PartTypes,
    RocketPartPrototypes,
} from "@/config/rocket_parts";

import { db } from "@/db";

import { Rocket, RocketStage } from "@/types/rocket";
import { GlobeLabel, Trajectory } from "@/types/rocket_stats";
import { RocketPart } from "@prisma/client";

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
    if (!updatedPart) throw new Error("No part found!");

    return { updatedRocket: shipCopy, updatedPart };
}

export function rocketScaleChanged(rocket: Rocket, newScale: number) {
    const shipCopy = structuredClone(rocket);

    const oldScaleSlider = shipCopy.scaleSlider;
    shipCopy.scaleSlider = newScale;

    let referencePart: null | RocketPart = null;
    let referencePartOldPos = { x: -99999, y: -99999 };

    for (const stage of shipCopy.stages) {
        for (const part of stage.parts) {
            // set the reference part, this will act as the reference point for scaling
            if (referencePart === null) {
                referencePart = part;
                referencePartOldPos = {
                    x: part.x,
                    y: part.y,
                };
            }

            const partScale = part.scale;
            const partCoords = { x: part.x, y: part.y };

            const oldWidth = part.width * partScale * oldScaleSlider;
            const newWidth = part.width * partScale * newScale;

            const oldHeight = part.height * partScale * oldScaleSlider;
            const newHeight = part.height * partScale * newScale;

            const widthChange = oldWidth - newWidth;
            const heightChange = oldHeight - newHeight;

            // Adjusting position based on its own size change
            part.x += widthChange / 2;
            part.y += heightChange / 2;

            // adjust part position relative to the reference
            if (part.id !== referencePart.id) {
                const relativeX = partCoords.x - referencePartOldPos.x;
                const relativeY = partCoords.y - referencePartOldPos.y;

                const unitX = relativeX / oldScaleSlider;
                const unitY = relativeY / oldScaleSlider;

                const newScaledX = referencePart.x + unitX * newScale;
                const newScaledY = referencePart.y + unitY * newScale;

                part.x = newScaledX;
                part.y = newScaledY;
            }
        }
    }
    return shipCopy;
}

export function translateRocket(
    rocket: Rocket,
    vector: { x: number; y: number }
) {
    const shipCopy = structuredClone(rocket);
    for (const stage of shipCopy.stages) {
        for (const part of stage.parts) {
            part.x += vector.x;
            part.y += vector.y;
        }
    }
    return shipCopy;
}

export function rocketBounds(rocket: Rocket) {
    let bounds = {
        minX: 999999999,
        minY: 999999999,
        maxX: 0,
        maxY: 0,
        height: 0,
        width: 0,
    };

    for (let stage of rocket.stages) {
        for (let part of stage.parts) {
            if (bounds.minX > part.x) {
                bounds.minX = part.x;
            }
            if (bounds.minY > part.y) {
                bounds.minY = part.y;
            }
            if (bounds.maxX < part.x) {
                bounds.maxX = part.x;
            }
            if (bounds.maxY < part.y) {
                bounds.maxY = part.y;
            }
        }
    }
    bounds.width = bounds.maxX - bounds.minX;
    bounds.height = bounds.maxY - bounds.minY;

    return bounds;
}

export function fuelMassCalc(object: { diameter: number; length: number }) {
    const volume = Math.PI * Math.pow(object.diameter / 2, 2) * object.length;
    const density_fuel = 422;
    const density_oxygen = 1141;
    const weight =
        volume * 0.65 * density_oxygen + volume * 0.35 * density_fuel;
    return weight;
}

export function getDeltaV(
    totalMass: number,
    dryMass: number,
    totalIsp: number,
    gravity: number
) {
    if (!totalMass || !dryMass) return 0;

    const exhaustRatio = totalMass / dryMass;
    const exhaustVelocity = totalIsp * gravity;
    const deltaV = exhaustVelocity * Math.log(exhaustRatio);
    return deltaV;
}

export function massFlowRate(
    isp: number,
    thrust_newtons: number,
    gravity: number,
    throttle: number = 1
) {
    const exhaustVelocity = isp * gravity;
    const massFlowRate = thrust_newtons / exhaustVelocity;

    return massFlowRate * throttle;
}

export function twr(thrust_in_kN: number, mass: number) {
    if (!mass) return 0;
    return (thrust_in_kN * 1000) / (mass * GRAVITY_SOURCE.EARTH);
}

export function burnTime(propellant_mass: number, mass_flow_rate: number) {
    if (!propellant_mass || !massFlowRate) return 0;

    return propellant_mass / mass_flow_rate;
}

export const generateDefaultRocket = async ({
    userId,
    name,
}: {
    userId: string;
    name: string;
}) => {
    const defr = DefaultRockets.find((x) => x.key === name);
    if (!defr) throw new Error("DefaultRockets not found: " + name);

    const rocket = await db.rocket.create({
        data: {
            userId,
            name: defr!.name,
        },
    });

    let currentHeight = 80;

    for (let j = defr.stages.length - 1; j >= 0; j--) {
        const stage = defr.stages[j];
        const newStage = await db.rocketStage.create({
            data: {
                rocketId: rocket.id,
                stageIndex: j,
            },
        });

        //place fuel tank
        const protFuel = RocketPartPrototypes.find(
            (x) => x.name === stage.fuel
        );
        if (!protFuel)
            throw new Error("RocketPartPrototype not found: " + stage.fuel);

        const tankHeight = protFuel.height * protFuel.scale * 0.5;
        await db.rocketPart.create({
            data: {
                stageId: newStage.id,
                part_type: protFuel.part_type,
                name: stage.fuel,
                x: 150,
                y: currentHeight,
                height: protFuel.height,
                width: protFuel.width,
                image: protFuel.image ?? "",
                scale: protFuel.scale * 0.5,
                scaled_height: 0,
                scaled_width: 0,
                targetStage: j,
                weight: protFuel.weight,
                length: protFuel.length ?? 0,
                diameter: protFuel.diameter ?? 0,
            },
        });
        currentHeight += tankHeight;

        //place engines
        const protEngine = RocketPartPrototypes.find(
            (x) => x.name === stage.engine
        );
        if (!protEngine)
            throw new Error("RocketPartPrototype not found: " + stage.engine);

        const engineHeight = protEngine.height * protEngine.scale;
        for (let i = 0; i < stage.engine_nmb; i++) {
            await db.rocketPart.create({
                data: {
                    stageId: newStage.id,
                    part_type: protEngine.part_type,
                    name: stage.engine,
                    x: 50 + i * 50,
                    y: currentHeight,
                    height: protEngine.height,
                    width: protEngine.width,
                    image: protEngine.image ?? "",
                    scale: protEngine.scale,
                    scaled_height: 0,
                    scaled_width: 0,
                    targetStage: j,
                    weight: protEngine.weight,
                },
            });
        }
        currentHeight += engineHeight;
    }

    return rocket;
};

export function generateGlobeLabels(trajectories: Trajectory[]) {
    let labels: GlobeLabel[] = [
        {
            lat: trajectories[0].points[0].lat,
            lng: trajectories[0].points[0].lng,
            alt: trajectories[0].points[0].alt,
            text: "Launchpad",
        },
    ];

    let currentStage = "";
    let stageIndex = 0;

    let maxPoint: GlobeLabel = {
        ...trajectories[0].points[0],
        text: "Peak altitude",
        labelSize: 0.25,
    };
    if (!maxPoint || !maxPoint.alt) throw new Error("Peak altitude not found");

    for (let trajectory of trajectories) {
        //Engine cutoff point
        if (!trajectory.stageId) {
            labels.push({
                lat: trajectory.points[0].lat,
                lng: trajectory.points[0].lng,
                alt: trajectory.points[0].alt,
                labelSize: 0.35,
                text: "Engine cutoff",
            });
        }

        //Stage label
        if (currentStage !== trajectory.stageId && trajectory.stageId) {
            const halfPoint = Math.floor(trajectory.points.length / 2);
            labels.push({
                lat: trajectory.points[halfPoint].lat,
                lng: trajectory.points[halfPoint].lng,
                alt: trajectory.points[halfPoint].alt,
                labelSize: 0.25,
                labelDotRadius: 0.05,
                text: `Stage ${stageIndex + 1}`,
                color: trajectory.pathColor,
            });
            currentStage = trajectory.stageId;
        }

        //Find max
        for (let point of trajectory.points) {
            if (maxPoint.alt < point.alt) {
                maxPoint.alt = point.alt;
                maxPoint.lat = point.lat;
                maxPoint.lng = point.lng;
            }
        }

        stageIndex++;
    }

    labels.push(maxPoint);

    const lastTrajectoryPoints = trajectories[trajectories.length - 1].points;
    if (lastTrajectoryPoints[lastTrajectoryPoints.length - 1].alt > 0)
        return labels;

    labels.push({
        lat: lastTrajectoryPoints[lastTrajectoryPoints.length - 1].lat,
        lng: lastTrajectoryPoints[lastTrajectoryPoints.length - 1].lng,
        text: "Touchdown",
        color: "lightgray",
    });
    return labels;
}
