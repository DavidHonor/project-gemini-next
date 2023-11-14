import { trpc } from "@/app/_trpc/client";
import { TutorialStatus, TutorialStep } from "@prisma/client";

interface useTutorialProps {
    stepIdentity?: TutorialStep;
}
export const useTutorial = ({ stepIdentity }: useTutorialProps) => {
    const { data: dbUser, refetch: fetchTutorial } =
        trpc.user.getUser.useQuery();

    const result = () => {
        if (!dbUser || "code" in dbUser)
            return { isActive: false, stepActive: false, activeStep: "" };

        if (dbUser.tutorialStatus !== TutorialStatus.STARTED)
            return { isActive: false, stepActive: false, activeStep: "" };

        return {
            isActive: true,
            stepActive: stepIdentity === dbUser.tutorialStep,
            activeStep: dbUser.tutorialStep,
        };
    };

    const active = result();

    return {
        isActive: active.isActive,
        stepActive: active.stepActive,
        activeStep: active.activeStep,
        fetchTutorial,
    };
};
