import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";
import { absoluteUrl } from "@/lib/utils";
import { RocketPartSchema } from "../../prisma/generated/zod";
import { PartTypes, RocketPartPrototypes } from "@/config/rocket_parts";

export const appRouter = router({
    authCallback: publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession();
        const user = getUser();

        if (!user || !user.id || !user.email)
            throw new TRPCError({ code: "UNAUTHORIZED" });

        //check if the user is in the database
        const dbUser = await db.user.findFirst({
            where: {
                id: user.id,
            },
        });
        if (!dbUser) {
            //create user in db
            await db.user.create({
                data: {
                    id: user.id,
                    email: user.email,
                },
            });
        }

        return { success: true };
    }),
    getUserRocket: privateProcedure
        .input(
            z.object({
                rocketId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { rocketId } = input;

            const rocket = await db.rocket.findFirst({
                where: {
                    id: rocketId,
                    userId,
                },
                include: {
                    stages: {
                        include: {
                            parts: true,
                        },
                    },
                },
            });
            if (!rocket) throw new TRPCError({ code: "NOT_FOUND" });

            return rocket;
        }),
    getUserRockets: privateProcedure.query(async ({ ctx }) => {
        const { userId, user } = ctx;

        return await db.rocket.findMany({
            where: {
                userId,
            },
            include: {
                stages: true,
            },
        });
    }),
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

            // =====================================
            // = Create rocket stages if neccecary =
            // =====================================
            if (!rocket.stages.length) {
                await db.rocketStage.create({
                    data: {
                        rocketId,
                    },
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
    updateRocketScale: privateProcedure
        .input(z.object({ scaleSlider: z.number(), rocketId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { scaleSlider, rocketId } = input;

            const rocket = await db.rocket.update({
                where: {
                    userId,
                    id: rocketId,
                },
                data: {
                    scaleSlider,
                },
            });
            if (!rocket) return new TRPCError({ code: "NOT_FOUND" });

            //TODO IMPLEMENT THE CHANGES TO ROCKET PART COORDINATES AND SIZES

            return { status: "success", message: "Scale updated successfully" };
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
            const updatedPart = await db.rocketPart.update({
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
});

export type AppRouter = typeof appRouter;
