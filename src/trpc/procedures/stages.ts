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
                include: {
                    stages: true,
                },
            });
            if (!rocket) return new TRPCError({ code: "NOT_FOUND" });

            const stage = await db.rocketStage.create({
                data: {
                    rocketId,
                    stageIndex: rocket.stages.length,
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

            const oldStage = rocket.stages.find((x) => x.id === part.stageId);
            if (!oldStage) return new TRPCError({ code: "NOT_FOUND" });

            if (moveDir === -1 && oldStage.stageIndex === 0)
                return new TRPCError({ code: "FORBIDDEN" });

            //stage does yet exist (up direction)
            if (oldStage.stageIndex + moveDir > rocket.stages.length - 1) {
                const stage = await db.rocketStage.create({
                    data: {
                        rocketId: rocket.id,
                        stageIndex: rocket.stages.length,
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

            const newStage = rocket.stages.find(
                (x) => x.stageIndex === oldStage.stageIndex + moveDir
            );
            if (!newStage) return new TRPCError({ code: "NOT_FOUND" });

            await db.rocketPart.update({
                where: {
                    id: partId,
                },
                data: {
                    stageId: newStage.id,
                },
            });

            return {
                status: "success",
                message: "Stages with parts updated successfully",
            };
        }),
    updateStageIndex: privateProcedure
        .input(
            z.object({
                rocketId: z.string(),
                stageId: z.string(),
                moveDir: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { rocketId, stageId, moveDir } = input;

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

            const stage = rocket.stages.find((x) => x.id === stageId);
            if (!stage) return new TRPCError({ code: "NOT_FOUND" });

            const newStageIndex = stage.stageIndex + moveDir;
            if (newStageIndex < 0 || newStageIndex >= rocket.stages.length) {
                return new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Invalid move direction",
                });
            }

            const swapStage = rocket.stages.find(
                (x) => x.stageIndex === newStageIndex
            );
            if (!swapStage) return new TRPCError({ code: "NOT_FOUND" });

            await db.rocketStage.update({
                where: {
                    id: swapStage.id,
                },
                data: {
                    stageIndex: stage.stageIndex,
                },
            });

            await db.rocketStage.update({
                where: {
                    id: stage.id,
                },
                data: {
                    stageIndex: newStageIndex,
                },
            });

            return {
                status: "success",
                message: "Stage index updated",
            };
        }),
});
