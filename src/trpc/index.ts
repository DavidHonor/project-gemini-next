import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";
import { absoluteUrl } from "@/lib/utils";

import { RocketPartSchema } from "../../prisma/generated/zod";

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
    saveRocketPart: privateProcedure
        .input(
            z.object({
                rocketPart: RocketPartSchema,
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { rocketPart } = input;

            // const part = db.rocketPart.findFirst({
            //     where: {
            //         id: partId,
            //     },
            //     include: {
            //         rocketStage: {
            //             include: {
            //                 rocket: true,
            //             },
            //         },
            //     },
            // });

            const part = db.rocketPart.update({
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

            console.log("new pos:", rocketPart.x, rocketPart.y);

            return part;
        }),
});

export type AppRouter = typeof appRouter;
