export type State = {
    x: number;
    y: number;

    xVelocity: number;
    yVelocity: number;

    mass: number;
};

export type RK4ConfigVars = {
    thrustNewtons: number;
    massFlowRate: number;
    largestSection: number;
    turnStartAlt: number;
    turnEndAlt: number;
    turnRate: number;
};
