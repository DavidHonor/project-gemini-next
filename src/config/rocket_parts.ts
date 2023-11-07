export const GRAVITY_SOURCE = {
    EARTH: 9.81,
};

export const AIR_DENSITY_SEA_LEVEL = 1.225; // kg/m^3

export const EARTH_RADIUS = 6371000;

export const DefaultLaunchConfig = {
    LAUNCH_LAT: 28.608389,
    LAUNCH_LNG: -80.604333,
    HEADING: 90,

    launchPoint: {
        x: 0,
        y: EARTH_RADIUS,
    },

    TURN_START_ALT: 10000,
    TURN_END_ALT: 80000,
    TURN_RATE: 0,

    TIMESTEP: 1,
    COASTING_MINUTES: 15,

    TRACE_COLORS: ["red", "blue", "green", "yellow", "BlueViolet"],
};

export type LaunchConfigType = typeof DefaultLaunchConfig;

export enum PartTypes {
    ENGINE = "Engine",
    FUELTANK = "Fuel tank",
    COMMANDPOD = "Command pod",
    UTILITY = "Utility",
}

export const RocketPartPrototypes = [
    {
        part_type: PartTypes.ENGINE,
        name: "RS-25",
        image: "rs-25_1.png",
        fuel_type: "hydrolox",
        thrust_sl: 1860,
        thrust_vc: 2279,
        isp_sl: 366,
        isp_vc: 452,
        weight: 3177,
        scale: 0.5,
        width: 0,
        height: 0,
    },
    {
        part_type: PartTypes.ENGINE,
        name: "Merlin",
        image: "merlin_c.png",
        fuel_type: "kerolox",
        thrust_sl: 845,
        thrust_vc: 981,
        isp_sl: 282,
        isp_vc: 311,
        weight: 470,
        scale: 0.4,
        width: 183,
        height: 320,
    },
    {
        part_type: PartTypes.ENGINE,
        name: "Merlin Vacuum",
        image: "merlin_c.png",
        fuel_type: "kerolox",
        thrust_sl: 981,
        thrust_vc: 981,
        isp_sl: 311,
        isp_vc: 311,
        weight: 470,
        scale: 0.4,
        width: 183,
        height: 320,
    },
    {
        part_type: PartTypes.ENGINE,
        name: "Raptor",
        image: "raptor_1.png",
        fuel_type: "methalox",
        thrust_sl: 1860,
        thrust_vc: 2279,
        isp_sl: 327,
        isp_vc: 363,
        weight: 1600,
        scale: 0.5,
        width: 0,
        height: 0,
    },

    {
        part_type: PartTypes.FUELTANK,
        name: "2m tank",
        image: "fuel_2m.png",
        diameter: 2,
        length: 10,
        weight: 5000,
        scale: 0.25,
        width: 300,
        height: 500,
    },
    {
        part_type: PartTypes.FUELTANK,
        name: "3m tank",
        image: "fuel_3m.png",
        diameter: 3,
        length: 10,
        weight: 7500,
        scale: 0.4,
        width: 300,
        height: 500,
    },
    {
        part_type: PartTypes.FUELTANK,
        name: "5m tank",
        image: "fuel_5m.png",
        diameter: 5,
        length: 10,
        weight: 15000,
        scale: 0.55,
        width: 300,
        height: 500,
    },
    {
        part_type: PartTypes.FUELTANK,
        name: "8.4m Space Shuttle Tank",
        image: "fuel_1.png",
        diameter: 8.4,
        length: 45,
        weight: 26500,
        scale: 1,
        width: 300,
        height: 500,
    },
    {
        part_type: PartTypes.FUELTANK,
        name: "3.7m Falcon 9 tank",
        image: "falcon9_37.png",
        diameter: 3.7,
        length: 41,
        weight: 25000,
        scale: 1,
        width: 300,
        height: 500,
    },

    {
        part_type: PartTypes.COMMANDPOD,
        name: "gemini spacecraft",
        image: "gemini.png",
        weight: 3700,
        scale: 0.7,
        width: 157,
        height: 298,
    },
    {
        part_type: PartTypes.COMMANDPOD,
        name: "apollo spacecraft",
        weight: 5800,
        scale: 0.6,
        width: 0,
        height: 0,
    },

    {
        part_type: PartTypes.UTILITY,
        name: "Landing legs",
        image: "landing_leg.png",
        weight: 1500,
        scale: 1,
        width: 401,
        height: 239,
    },
];
