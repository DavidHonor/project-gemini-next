import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";

import { authRouter } from "./procedures/auth";
import { rocketRouter } from "./procedures/rockets";
import { stageRouter } from "./procedures/stages";
import { partRouter } from "./procedures/parts";
import { userRouter } from "./procedures/user";

export const appRouter = router({
    user: userRouter,
    auth: authRouter,
    rocket: rocketRouter,
    stage: stageRouter,
    part: partRouter,
});

export type AppRouter = typeof appRouter;
