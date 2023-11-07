import { EARTH_RADIUS } from "@/config/rocket_parts";
import { calculateDrag } from "@/lib/ship_functions";
import { degreesToRadians, radiansToDegrees } from "@/lib/utils";

export type rk4Vars = {
    thrust: number; //in Newtowns (N)
    massFlowRate: number;
    largestSection: number;

    TIMESTEP: number;
    TURN_START_ALT: number;
    TURN_END_ALT: number;
    TURN_RATE: number;
};

export type Derivative = State;

let stageVars: rk4Vars = {
    thrust: 0,
    massFlowRate: 0,
    largestSection: 0,

    TIMESTEP: 0,
    TURN_START_ALT: 0,
    TURN_END_ALT: 0,
    TURN_RATE: 0,
};

interface State {
    x: number;
    y: number;

    xVelocity: number;
    yVelocity: number;

    mass: number;
}

export function calculateDistanceFromCenter(state: State): number {
    return Math.sqrt(state.x ** 2 + state.y ** 2);
}

export function calculateAltitude(state: State): number {
    return calculateDistanceFromCenter(state) - EARTH_RADIUS;
}

function calculateGravitationalForce(
    mass: number,
    distanceFromCenter: number
): number {
    const G = 6.6743e-11;
    const earthMass = 5.972e24;
    return (G * mass * earthMass) / distanceFromCenter ** 2;
}

function turnLogic(
    state: State,
    t: number,
    gravityForce: number,
    thrust: number
): number {
    if (thrust === 0) return degreesToRadians(90);
    const altitude = calculateAltitude(state);
    if (altitude < stageVars.TURN_START_ALT) return 0;

    let turnAngle = 0;
    if (altitude < stageVars.TURN_END_ALT) {
        turnAngle =
            Math.max(0, altitude - stageVars.TURN_START_ALT) *
            stageVars.TURN_RATE;

        // Ensure no vertical speed is lost
        const verticalThrustComponent = Math.cos(turnAngle) * thrust;
        if (verticalThrustComponent <= gravityForce) {
            turnAngle = Math.acos(gravityForce / thrust);
        }

        return turnAngle;
    }

    // Gradually transition to horizontal flight
    const gravityTurnAngle = Math.acos(gravityForce / thrust);
    turnAngle = Math.min(Math.max(gravityTurnAngle, 0), degreesToRadians(90));

    return turnAngle;
}

function derivative(state: State, t: number): Derivative {
    const thrust = stageVars.thrust;
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
        stageVars.largestSection,
        velocityMagnitude,
        distanceFromCenter - EARTH_RADIUS
    );

    // Turning logic
    let turnAngle = turnLogic(state, t, gravityMagnitude, thrust);
    angleOfVelocity += turnAngle;

    // Calculate force components based on the turn angle
    const thrustYComponent = Math.cos(turnAngle) * thrust;
    const thrustXComponent = Math.sin(turnAngle) * thrust;

    // Drag forces proportionally
    let dragXComponent = 0;
    let dragYComponent = 0;

    if (velocityMagnitude !== 0) {
        dragXComponent = drag * (state.xVelocity / velocityMagnitude);
        dragYComponent = drag * (state.yVelocity / velocityMagnitude);
    }

    // Calculate the net forces including thrust, drag, and gravity
    const netForceY = thrustYComponent - dragYComponent + gravityForceY;
    const netForceX = thrustXComponent - dragXComponent + gravityForceX;

    // Compute accelerations
    const accelerationY = netForceY / state.mass;
    const accelerationX = netForceX / state.mass;

    //Check if the rocket is coasting
    const massRateOfChange = thrust > 0 ? -stageVars.massFlowRate : 0;

    return {
        x: state.xVelocity,
        y: state.yVelocity,

        xVelocity: accelerationX,
        yVelocity: accelerationY,

        mass: massRateOfChange,
    };
}

export function rk4(state: State, vars: rk4Vars, t: number, dt: number): State {
    stageVars = vars;

    const a = derivative(state, t);
    const b = derivative(
        updateState(state, scaleDerivative(a, dt / 2)),
        t + dt / 2
    );
    const c = derivative(
        updateState(state, scaleDerivative(b, dt / 2)),
        t + dt / 2
    );
    const d = derivative(updateState(state, scaleDerivative(c, dt)), t + dt);

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
