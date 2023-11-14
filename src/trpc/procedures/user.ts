import { db } from "@/db";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { TutorialStatus, TutorialStep } from "@prisma/client";
import { z } from "zod";

const TutorialStepSchema = z.nativeEnum(TutorialStep);

export const userRouter = router({
    getUser: privateProcedure.query(async ({ ctx }) => {
        const { userId } = ctx;

        const dbUser = await db.user.findFirst({
            where: {
                id: userId,
            },
        });
        if (!dbUser) return new TRPCError({ code: "NOT_FOUND" });

        if (dbUser.tutorialStatus === TutorialStatus.NOTSTARTED) {
            await db.user.update({
                where: {
                    id: userId,
                },
                data: {
                    tutorialStatus: TutorialStatus.STARTED,
                },
            });
        }

        return dbUser;
    }),
    completeTutorialStep: privateProcedure
        .input(z.object({ currentStep: TutorialStepSchema }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { currentStep } = input;

            const dbUser = await db.user.findFirst({
                where: {
                    id: userId,
                },
            });
            if (!dbUser) return new TRPCError({ code: "NOT_FOUND" });

            let nextStep: TutorialStep = currentStep;
            let tutorialStatus: TutorialStatus = dbUser.tutorialStatus;

            if (tutorialStatus !== TutorialStatus.STARTED) return;
            if (currentStep !== dbUser.tutorialStep) return;

            switch (currentStep) {
                case "FIRSTROCKET":
                    nextStep = TutorialStep.FIRSTPART;
                    break;
                case "FIRSTPART":
                    nextStep = TutorialStep.STAGES;
                    break;
                case "STAGES":
                    nextStep = TutorialStep.PERFORMANCE;
                    break;
                case "PERFORMANCE":
                    tutorialStatus = TutorialStatus.COMPLETED;
                    break;
            }

            await db.user.update({
                where: {
                    id: userId,
                },
                data: {
                    tutorialStatus,
                    tutorialStep: nextStep,
                },
            });
        }),
});
