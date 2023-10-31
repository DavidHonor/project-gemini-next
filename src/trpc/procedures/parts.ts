import { privateProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";

import {
    RocketStageSchema,
    RocketPartSchema,
    RocketSchema,
    RocketPart,
} from "../../../prisma/generated/zod";

import { PartTypes, RocketPartPrototypes } from "@/config/rocket_parts";

export const partRouter = router({
    updatePartPosition: privateProcedure
        .input(
            z.object({
                rocketPart: RocketPartSchema,
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { rocketPart } = input;

            // Fetch the part with its associated rocket
            const partWithRocket = await db.rocketPart.findUnique({
                where: { id: rocketPart.id },
                include: { rocketStage: { include: { rocket: true } } },
            });

            if (
                partWithRocket === null ||
                partWithRocket.rocketStage === null ||
                partWithRocket.rocketStage.rocket === null
            )
                return new TRPCError({ code: "NOT_FOUND" });

            // Check if the part's rocket's userId matches the current user's userId
            const partRocketUserId = partWithRocket.rocketStage.rocket.userId;
            if (partRocketUserId !== userId) {
                return new TRPCError({
                    code: "FORBIDDEN",
                    message: "You don't have permission to update this part.",
                });
            }

            const part = await db.rocketPart.update({
                where: {
                    id: rocketPart.id,
                },
                data: {
                    x: rocketPart.x,
                    y: rocketPart.y,
                },
            });

            if (!part)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Rocket part not found",
                });

            return part;
        }),

    createRocketPart: privateProcedure
        .input(z.object({ partName: z.string(), rocketId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { partName, rocketId } = input;

            if (!partName || !rocketId)
                return new TRPCError({ code: "NOT_FOUND" });

            const prototypePart = RocketPartPrototypes.find(
                (x) => x.name === partName
            );
            if (!prototypePart) return new TRPCError({ code: "NOT_FOUND" });

            let rocket = await db.rocket.findFirst({
                where: {
                    userId,
                    id: rocketId,
                },
                include: {
                    stages: true,
                },
            });
            if (!rocket) return new TRPCError({ code: "NOT_FOUND" });

            // =====================================
            // = Create rocket stages if neccecary =
            // =====================================
            if (!rocket.stages.length) {
                await db.rocketStage.create({
                    data: {
                        rocketId,
                    },
                });
                rocket = await db.rocket.findFirst({
                    where: {
                        userId,
                        id: rocketId,
                    },
                    include: {
                        stages: true,
                    },
                });
                if (!rocket)
                    return new TRPCError({
                        code: "NOT_FOUND",
                        message: "Creating stage failed",
                    });
            }

            const latestStage = rocket.stages[rocket.stages.length - 1];

            const newPart = await db.rocketPart.create({
                data: {
                    stageId: latestStage.id,
                    part_type: prototypePart.part_type,
                    name: partName,
                    x: 0,
                    y: 0,
                    height: prototypePart.height,
                    width: prototypePart.width,
                    image: prototypePart.image ?? "",
                    scale: prototypePart.scale,
                    scaled_height: 0,
                    scaled_width: 0,
                    targetStage: rocket.stages.length - 1,
                    weight: prototypePart.weight,
                    length: prototypePart.length ?? 0, //for fuel tanks
                    diameter: prototypePart.diameter ?? 0, //for fuel tanks
                },
            });

            return newPart;
        }),

    updatePartScale: privateProcedure
        .input(z.object({ part: RocketPartSchema }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { part } = input;

            // Fetch the part with its associated rocket
            const partWithRocket = await db.rocketPart.findUnique({
                where: { id: part.id },
                include: { rocketStage: { include: { rocket: true } } },
            });

            if (
                partWithRocket === null ||
                partWithRocket.rocketStage === null ||
                partWithRocket.rocketStage.rocket === null
            )
                return new TRPCError({ code: "NOT_FOUND" });

            // Check if the part's rocket's userId matches the current user's userId
            const partRocketUserId = partWithRocket.rocketStage.rocket.userId;
            if (partRocketUserId !== userId) {
                return new TRPCError({
                    code: "FORBIDDEN",
                    message: "You don't have permission to update this part.",
                });
            }

            // If the user has permission, update the part
            await db.rocketPart.update({
                where: { id: part.id },
                data: {
                    scale: part.scale,
                    width: part.width,
                    height: part.height,
                    x: part.x,
                    y: part.y,
                },
            });

            return {
                status: "success",
                message: "Part scale updated successfully",
            };
        }),

    deletePart: privateProcedure
        .input(z.object({ partId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { partId } = input;

            // Fetch the part with its associated rocket
            const partWithRocket = await db.rocketPart.findUnique({
                where: { id: partId },
                include: { rocketStage: { include: { rocket: true } } },
            });

            if (
                partWithRocket === null ||
                partWithRocket.rocketStage === null ||
                partWithRocket.rocketStage.rocket === null
            )
                return new TRPCError({ code: "NOT_FOUND" });

            // Check if the part's rocket's userId matches the current user's userId
            const partRocketUserId = partWithRocket.rocketStage.rocket.userId;
            if (partRocketUserId !== userId) {
                return new TRPCError({
                    code: "FORBIDDEN",
                    message: "You don't have permission to update this part.",
                });
            }

            // If the user has permission, update the part
            await db.rocketPart.delete({
                where: { id: partId },
            });

            return {
                status: "success",
                message: "Part removed successfully",
            };
        }),
});
