import {
    calculateDrag,
    calculateGravitationalForce,
} from "@/lib/ship_functions";

interface State {
    altitude: number;
    verticalVelocity: number;
    east: number;
    eastVelocity: number;
    mass: number;
}

export type rk4Vars = {
    thrust: number;
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

function derivative(state: State, t: number): Derivative {
    const thrust = stageVars.thrust;
    const drag = calculateDrag(
        stageVars.largestSection,
        state.verticalVelocity + state.eastVelocity,
        state.altitude
    );
    const gravityForce = calculateGravitationalForce(
        state.mass,
        state.altitude
    );

    // Turning logic
    let turnAngle = 0;
    if (
        state.altitude > stageVars.TURN_START_ALT &&
        state.altitude < stageVars.TURN_END_ALT
    ) {
        turnAngle =
            (Math.max(0, state.altitude - stageVars.TURN_START_ALT) *
                stageVars.TURN_RATE) %
            (Math.PI / 2);
    } else if (state.altitude > stageVars.TURN_END_ALT) {
        turnAngle = 1.5708;
    }

    let eastwardAcceleration = 0;
    let verticalAcceleration = thrust / state.mass - gravityForce / state.mass;

    if (turnAngle > 0) {
        const eastwardForceProportion = Math.sin(turnAngle);
        const verticalForceProportion = Math.cos(turnAngle);

        const verticalNetForce =
            thrust * verticalForceProportion -
            gravityForce -
            drag * verticalForceProportion;
        const eastwardNetForce =
            thrust * eastwardForceProportion - drag * eastwardForceProportion;

        verticalAcceleration = verticalNetForce / state.mass;
        eastwardAcceleration = eastwardNetForce / state.mass;
    }

    //Check if the rocket is coasting
    const massRateOfChange = thrust > 0 ? -stageVars.massFlowRate : 0;

    return {
        altitude: state.verticalVelocity,
        verticalVelocity: verticalAcceleration,
        east: state.eastVelocity,
        eastVelocity: eastwardAcceleration,
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

    const dxdt = (a.altitude + 2 * (b.altitude + c.altitude) + d.altitude) / 6;
    const dvdt =
        (a.verticalVelocity +
            2 * (b.verticalVelocity + c.verticalVelocity) +
            d.verticalVelocity) /
        6;
    const dedt = (a.east + 2 * (b.east + c.east) + d.east) / 6;
    const devdt =
        (a.eastVelocity +
            2 * (b.eastVelocity + c.eastVelocity) +
            d.eastVelocity) /
        6;
    const dmdt = (a.mass + 2 * (b.mass + c.mass) + d.mass) / 6;

    return {
        altitude: state.altitude + dxdt * dt,
        verticalVelocity: state.verticalVelocity + dvdt * dt,
        east: state.east + dedt * dt,
        eastVelocity: state.eastVelocity + devdt * dt,
        mass: state.mass + dmdt,
    };
}

function scaleDerivative(
    derivative: Derivative,
    scaleFactor: number
): Derivative {
    return {
        altitude: derivative.altitude * scaleFactor,
        verticalVelocity: derivative.verticalVelocity * scaleFactor,
        east: derivative.east * scaleFactor,
        eastVelocity: derivative.eastVelocity * scaleFactor,
        mass: derivative.mass * scaleFactor,
    };
}

function updateState(state: State, derivative: Derivative): State {
    return {
        altitude: state.altitude + derivative.altitude,
        verticalVelocity: state.verticalVelocity + derivative.verticalVelocity,
        east: state.east + derivative.east,
        eastVelocity: state.eastVelocity + derivative.eastVelocity,
        mass: state.mass + derivative.mass,
    };
}
