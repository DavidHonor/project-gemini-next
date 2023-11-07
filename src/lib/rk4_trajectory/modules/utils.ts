import { State } from "./types";
import {
    DRAG_COEFFICIENT,
    EARTH_RADIUS,
    AIR_DENSITY_SEA_LEVEL,
} from "./config";

export function calculateGravitationalForce(
    mass: number,
    distanceFromCenter: number
): number {
    const G = 6.6743e-11;
    const earthMass = 5.972e24;
    return (G * mass * earthMass) / distanceFromCenter ** 2;
}

export function calculateDrag(
    diameter: number,
    velocity: number,
    altitude: number
): number {
    const airDensity = getAirDensity(altitude);

    const area = Math.PI * Math.pow(diameter / 2, 2);

    const dragForce = Math.abs(
        0.5 * airDensity * Math.pow(velocity, 2) * DRAG_COEFFICIENT * area
    );

    return dragForce;
}

export function calculateDistanceFromCenter(state: State): number {
    return Math.sqrt(state.x ** 2 + state.y ** 2);
}

export function calculateAltitude(state: State): number {
    return calculateDistanceFromCenter(state) - EARTH_RADIUS;
}

export function degreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180);
}

export function radiansToDegrees(radians: number) {
    return radians * (180 / Math.PI);
}

function getAirDensity(altitude: number): number {
    const scaleHeight = 8500;
    return AIR_DENSITY_SEA_LEVEL * Math.exp(-altitude / scaleHeight);
}
