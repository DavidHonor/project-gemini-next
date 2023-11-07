import { EARTH_RADIUS } from "./config";
import { RK4ConfigVars, State } from "./types";
import {
    calculateAltitude,
    calculateDistanceFromCenter,
    calculateDrag,
    calculateGravitationalForce,
    degreesToRadians,
} from "./utils";

type Derivative = State;
export type { RK4ConfigVars, State };

function derivative(
    state: State,
    t: number,
    config: RK4ConfigVars
): Derivative {
    const distanceFromCenter = calculateDistanceFromCenter(state);

    const gravityMagnitude = calculateGravitationalForce(
        state.mass,
        distanceFromCenter
    );
    const gravityDirection = {
        x: -state.x / distanceFromCenter,
        y: -state.y / distanceFromCenter,
    };

    const gravityForceX = gravityMagnitude * gravityDirection.x;
    const gravityForceY = gravityMagnitude * gravityDirection.y;

    let angleOfVelocity = Math.atan2(state.yVelocity, state.xVelocity);

    const velocityMagnitude = Math.sqrt(
        state.xVelocity ** 2 + state.yVelocity ** 2
    );

    const drag = calculateDrag(
        config.largestSection,
        velocityMagnitude,
        distanceFromCenter - EARTH_RADIUS
    );

    let turnAngle = turnLogic(state, t, config, gravityMagnitude);
    angleOfVelocity += turnAngle;

    // Calculate force components based on the turn angle
    const thrustYComponent = Math.cos(turnAngle) * config.thrustNewtons;
    const thrustXComponent = Math.sin(turnAngle) * config.thrustNewtons;

    // Drag forces proportionally
    let dragXComponent = 0;
    let dragYComponent = 0;

    if (velocityMagnitude !== 0) {
        dragXComponent = drag * (state.xVelocity / velocityMagnitude);
        dragYComponent = drag * (state.yVelocity / velocityMagnitude);
    }

    // Calculate the net forces including thrust_newtons, drag, and gravity
    const netForceY = thrustYComponent - dragYComponent + gravityForceY;
    const netForceX = thrustXComponent - dragXComponent + gravityForceX;

    // Compute accelerations
    const accelerationY = netForceY / state.mass;
    const accelerationX = netForceX / state.mass;

    //Check if the rocket is coasting
    const massRateOfChange =
        config.thrustNewtons > 0 ? -config.massFlowRate : 0;

    return {
        x: state.xVelocity,
        y: state.yVelocity,

        xVelocity: accelerationX,
        yVelocity: accelerationY,

        mass: massRateOfChange,
    };
}

export function rk4(
    state: State,
    config: RK4ConfigVars,
    t: number,
    dt: number
): State {
    const a = derivative(state, t, config);
    const b = derivative(
        updateState(state, scaleDerivative(a, dt / 2)),
        t + dt / 2,
        config
    );
    const c = derivative(
        updateState(state, scaleDerivative(b, dt / 2)),
        t + dt / 2,
        config
    );
    const d = derivative(
        updateState(state, scaleDerivative(c, dt)),
        t + dt,
        config
    );

    const dx = (a.x + 2 * (b.x + c.x) + d.x) / 6;
    const dy = (a.y + 2 * (b.y + c.y) + d.y) / 6;

    const dxVelocity =
        (a.xVelocity + 2 * (b.xVelocity + c.xVelocity) + d.xVelocity) / 6;
    const dyVelocity =
        (a.yVelocity + 2 * (b.yVelocity + c.yVelocity) + d.yVelocity) / 6;

    const dMass = (a.mass + 2 * (b.mass + c.mass) + d.mass) / 6;

    return {
        x: state.x + dx * dt,
        y: state.y + dy * dt,

        xVelocity: state.xVelocity + dxVelocity * dt,
        yVelocity: state.yVelocity + dyVelocity * dt,

        mass: state.mass + dMass * dt,
    };
}

function scaleDerivative(
    derivative: Derivative,
    scaleFactor: number
): Derivative {
    return {
        x: derivative.x * scaleFactor,
        y: derivative.y * scaleFactor,

        xVelocity: derivative.xVelocity * scaleFactor,
        yVelocity: derivative.yVelocity * scaleFactor,

        mass: derivative.mass * scaleFactor,
    };
}

function updateState(state: State, derivative: Derivative): State {
    return {
        x: state.x + derivative.x,
        y: state.y + derivative.y,

        xVelocity: state.xVelocity + derivative.xVelocity,
        yVelocity: state.yVelocity + derivative.yVelocity,

        mass: state.mass + derivative.mass,
    };
}

const NO_THRUST_TURN_ANGLE_DEGREES = 90;
const MAX_TURN_ANGLE_DEGREES = 94;

function turnLogic(
    state: State,
    t: number,
    config: RK4ConfigVars,
    gravityForce: number
): number {
    if (!config.thrustNewtons)
        return degreesToRadians(NO_THRUST_TURN_ANGLE_DEGREES);

    const altitude = calculateAltitude(state);
    if (altitude < config.turnStartAlt) return 0;

    let turnAngle = 0;
    if (altitude < config.turnEndAlt) {
        turnAngle =
            Math.max(0, altitude - config.turnStartAlt) * config.turnRate;

        // Ensure no vertical speed is lost
        const verticalThrustComponent =
            Math.cos(turnAngle) * config.thrustNewtons;
        if (verticalThrustComponent <= gravityForce) {
            turnAngle = Math.acos(gravityForce / config.thrustNewtons);
        }

        return turnAngle;
    }

    // Once past the turn end altitude, fixed turn angle
    return degreesToRadians(MAX_TURN_ANGLE_DEGREES);
}
