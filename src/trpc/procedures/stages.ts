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
                stageIndex: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { rocketId, partId, stageIndex } = input;

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

            if (stageIndex < 0) return new TRPCError({ code: "FORBIDDEN" });

            const newStage = rocket.stages.find(
                (x) => x.stageIndex === stageIndex
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
    deleteStage: privateProcedure
        .input(
            z.object({
                stageId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { stageId } = input;

            const stage = await db.rocketStage.findFirst({
                where: {
                    id: stageId,
                },
                include: {
                    rocket: true,
                },
            });
            if (!stage) return new TRPCError({ code: "NOT_FOUND" });
            if (!stage.rocket) return new TRPCError({ code: "NOT_FOUND" });
            if (stage.rocket.userId !== userId)
                return new TRPCError({ code: "FORBIDDEN" });

            await db.rocketStage.delete({
                where: {
                    id: stageId,
                },
            });

            return {
                status: "success",
                message: "Stage deleted",
            };
        }),
    updateStageIndex: privateProcedure
        .input(
            z.object({
                rocketId: z.string(),
                stageId: z.string(),
                index: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { rocketId, stageId, index } = input;

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

            const newStageIndex = index;
            if (newStageIndex < 0 || newStageIndex >= rocket.stages.length) {
                return new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Invalid stage index",
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
