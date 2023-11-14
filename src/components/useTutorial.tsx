import { trpc } from "@/app/_trpc/client";
import { TutorialStatus, TutorialStep } from "@prisma/client";

interface useTutorialProps {
    stepIdentity: TutorialStep;
}
export const useTutorial = ({ stepIdentity }: useTutorialProps) => {
    const { data: dbUser } = trpc.user.getUser.useQuery();

    const active = () => {
        if (!dbUser || "code" in dbUser) return false;

        if (dbUser.tutorialStatus !== TutorialStatus.STARTED) return false;

        if (stepIdentity !== dbUser.tutorialStep) return false;

        return true;
    };

    return {
        isActive: active(),
    };
};
