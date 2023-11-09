import {
    AIR_DENSITY_SEA_LEVEL,
    DefaultRockets,
    EARTH_RADIUS,
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

function getAirDensity(altitude: number): number {
    const scaleHeight = 8500; // Scale height for Earth's atmosphere in meters 1.225
    return AIR_DENSITY_SEA_LEVEL * Math.exp(-altitude / scaleHeight);
}
export function calculateDrag(
    diameter: number,
    velocity: number,
    altitude: number
): number {
    const airDensity = getAirDensity(altitude);
    const DRAG_COEFFICIENT = 0.75;

    const area = Math.PI * Math.pow(diameter / 2, 2);

    const dragForce = Math.abs(
        0.5 * airDensity * Math.pow(velocity, 2) * DRAG_COEFFICIENT * area
    );

    return dragForce;
}

function calculateGravityAtAltitude(altitude: number) {
    return (
        GRAVITY_SOURCE.EARTH *
        Math.pow(EARTH_RADIUS / (EARTH_RADIUS + altitude), 2)
    );
}

export function calculateGravitationalForce(mass: number, altitude: number) {
    const gravity = calculateGravityAtAltitude(altitude);
    const gravityForce = mass * gravity;
    return gravityForce;
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
            text: "Launchpad 39A",
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
