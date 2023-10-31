import { privateProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";

export const stageRouter = router({
    addRocketStage: privateProcedure
        .input(z.object({ rocketId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { rocketId } = input;

            const rocket = await db.rocket.findFirst({
                where: {
                    userId,
                    id: rocketId,
                },
            });
            if (!rocket) return new TRPCError({ code: "NOT_FOUND" });

            const stage = await db.rocketStage.create({
                data: {
                    rocketId,
                },
                include: {
                    parts: true,
                },
            });

            return stage;
        }),
});
