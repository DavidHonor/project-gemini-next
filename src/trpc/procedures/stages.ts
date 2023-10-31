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
    updatePartStage: privateProcedure
        .input(
            z.object({
                rocketId: z.string(),
                partId: z.string(),
                moveDir: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { rocketId, partId, moveDir } = input;

            const rocket = await db.rocket.findFirst({
                where: {
                    userId,
                    id: rocketId,
                },
                include: {
                    stages: true,
                },
            });
            if (!rocket) return new TRPCError({ code: "NOT_FOUND" });

            const part = await db.rocketPart.findFirst({
                where: {
                    id: partId,
                },
            });
            if (!part) return new TRPCError({ code: "NOT_FOUND" });

            const stageIndex = rocket.stages.findIndex(
                (x) => x.id === part.stageId
            );
            if (stageIndex === -1) return new TRPCError({ code: "NOT_FOUND" });

            if (moveDir === -1 && stageIndex === 0)
                return new TRPCError({ code: "FORBIDDEN" });

            //stage does yet exist (up direction)
            if (stageIndex + moveDir > rocket.stages.length - 1) {
                const stage = await db.rocketStage.create({
                    data: {
                        rocketId: rocket.id,
                    },
                });
                await db.rocketPart.update({
                    where: {
                        id: partId,
                    },
                    data: {
                        stageId: stage.id,
                    },
                });

                return {
                    status: "success",
                    message: "Stages with parts updated successfully",
                };
            }

            const stage = rocket.stages[stageIndex + moveDir];
            await db.rocketPart.update({
                where: {
                    id: partId,
                },
                data: {
                    stageId: stage.id,
                },
            });

            return {
                status: "success",
                message: "Stages with parts updated successfully",
            };
        }),
});
