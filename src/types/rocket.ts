import { AppRouter } from "@/trpc";
import { inferRouterOutputs } from "@trpc/server";

import {
    Rocket as RocketZodType,
    RocketStage as RocketStageZodType,
    RocketPart as RocketPartZodType,
} from "../../prisma/generated/zod/index";

// type RouterOutput = inferRouterOutputs<AppRouter>;
// type Rocket = RouterOutput["getUserRocket"];

type RocketPart = RocketPartZodType;
type RocketStage = RocketStageZodType & { parts: RocketPart[] };
type Rocket = RocketZodType & { stages: RocketStage[] };

// type RouterOutput3 = inferRouterOutputs<AppRouter>;
// type RocketPart = RouterOutput3["getRocketPart"];

type RouterOutput2 = inferRouterOutputs<AppRouter>;
type RocketName = RouterOutput2["getUserRockets"][0];

export type { Rocket, RocketName };
