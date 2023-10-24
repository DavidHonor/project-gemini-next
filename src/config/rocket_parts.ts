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
        scale: 1,
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
        scale: 0.7,
        width: 187,
        height: 323,
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
        scale: 1,
        width: 0,
        height: 0,
    },

    {
        part_type: PartTypes.FUELTANK,
        name: "2m tank",
        image: "fuel_1.png",
        diameter: 2,
        length: 10,
        weight: 5000,
        scale: 1,
        width: 0,
        height: 0,
    },
    {
        part_type: PartTypes.FUELTANK,
        name: "3m tank",
        image: "fuel_3m.png",
        diameter: 3,
        length: 10,
        weight: 7500,
        scale: 0.7,
        width: 300,
        height: 500,
    },
    {
        part_type: PartTypes.FUELTANK,
        name: "5m tank",
        image: "fuel_1.png",
        diameter: 5,
        length: 10,
        weight: 15000,
        scale: 1,
        width: 0,
        height: 0,
    },
    {
        part_type: PartTypes.FUELTANK,
        name: "8.4m Space Shuttle Tank",
        image: "fuel_1.png",
        diameter: 8.4,
        length: 45,
        weight: 26500,
        scale: 1,
        width: 0,
        height: 0,
    },
    {
        part_type: PartTypes.FUELTANK,
        name: "3.7m Falcon 9 tank",
        image: "fuel_1.png",
        diameter: 3.7,
        length: 41,
        weight: 25000,
        scale: 1,
        width: 0,
        height: 0,
    },

    {
        part_type: PartTypes.COMMANDPOD,
        name: "gemini spacecraft",
        image: "gemini.png",
        weight: 3700,
        scale: 1,
        width: 300,
        height: 300,
    },
    {
        part_type: PartTypes.COMMANDPOD,
        name: "apollo spacecraft",
        weight: 5800,
        scale: 1,
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