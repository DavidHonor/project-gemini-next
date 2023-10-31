import { privateProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";

import { dataUriToBuffer } from "data-uri-to-buffer";

import { admin } from "@/firebase/firebase";
import sharp from "sharp";

import {
    RocketStageSchema,
    RocketPartSchema,
    RocketSchema,
    RocketPart,
} from "../../../prisma/generated/zod";

const ExtendedRocketStageSchema = RocketStageSchema.extend({
    parts: z.array(RocketPartSchema),
});

const ExtendedRocketSchema = RocketSchema.extend({
    stages: z.array(ExtendedRocketStageSchema),
});

export const rocketRouter = router({
    getRocket: privateProcedure
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
                        orderBy: {
                            createdAt: "asc",
                        },
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

    createRocket: privateProcedure.mutation(async ({ ctx }) => {
        const { userId } = ctx;

        const noRockets = await db.rocket.count({
            where: {
                userId,
            },
        });

        const rocket = await db.rocket.create({
            data: {
                userId,
                name: `Rocket ${noRockets + 1}`,
            },
        });

        return rocket;
    }),

    deleteRocket: privateProcedure
        .input(z.object({ rocketId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { rocketId } = input;

            await db.rocket.delete({
                where: {
                    userId,
                    id: rocketId,
                },
            });

            return {
                status: "success",
                message: "Rocket removed successfully",
            };
        }),

    updateRocketScale: privateProcedure
        .input(
            z.object({ scaleSlider: z.number(), rocket: ExtendedRocketSchema })
        )
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { scaleSlider, rocket } = input;

            const rocketDb = await db.rocket.update({
                where: {
                    userId,
                    id: rocket.id,
                },
                data: {
                    scaleSlider,
                },
            });
            if (!rocketDb) return new TRPCError({ code: "NOT_FOUND" });

            for (const stage of rocket.stages) {
                for (const part of stage.parts) {
                    await db.rocketPart.update({
                        where: { id: part.id },
                        data: {
                            x: part.x,
                            y: part.y,
                        },
                    });
                }
            }

            return {
                status: "success",
                message: "Scale updated successfully",
            };
        }),

    uploadRocketPreview: privateProcedure
        .input(z.object({ rocketId: z.string(), image: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { rocketId, image } = input;

            const bucket = admin
                .storage()
                .bucket("project-gemini-next.appspot.com");

            const file = bucket.file(`rocket_previews/${rocketId}.png`);
            const parsedData = dataUriToBuffer(image);

            const trimmedBuffer = await sharp(parsedData.buffer)
                .trim()
                .toBuffer();

            file.save(trimmedBuffer, {
                contentType: parsedData.type,
                metadata: {
                    firebaseStorageDownloadTokens: rocketId,
                },
            })
                .then(() => {
                    console.log("Successfully uploaded!");
                })
                .catch((error: any) => {
                    console.error("Error uploading:", error);
                });
        }),

    getRocketPreview: privateProcedure
        .input(z.object({ rocketId: z.string() }))
        .query(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { rocketId } = input;

            const rocket = await db.rocket.findFirst({
                where: {
                    userId,
                    id: rocketId,
                },
            });
            if (!rocket) return new TRPCError({ code: "NOT_FOUND" });

            const bucket = admin
                .storage()
                .bucket("project-gemini-next.appspot.com");
            const file = bucket.file(`rocket_previews/${rocketId}.png`);

            const [exists] = await file.exists();
            if (!exists) return new TRPCError({ code: "NOT_FOUND" });

            const [url] = await file.getSignedUrl({
                action: "read",
                expires: Date.now() + 1000 * 60 * 180,
            });

            return { url };
        }),
});
