import { AppRouter } from "@/trpc";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Rocket = RouterOutput["getUserRocket"];

// type RouterOutput3 = inferRouterOutputs<AppRouter>;
// type RocketPart = RouterOutput3["getRocketPart"];

type RouterOutput2 = inferRouterOutputs<AppRouter>;
type RocketName = RouterOutput2["getUserRockets"][0];

export type { Rocket, RocketName };
