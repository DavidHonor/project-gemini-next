import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Switch,
    useDisclosure,
} from "@nextui-org/react";

import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { DefaultRockets } from "@/config/rocket_parts";

import { trpc } from "@/app/_trpc/client";
import { TutorialStep } from "@prisma/client";
import { useTutorial } from "@/components/useTutorial";

interface CreateRocketDialogProps {
    noRockets: number | undefined;
    createRocket: ({
        name,
        fromExisting,
    }: {
        name: string;
        fromExisting: boolean;
    }) => void;
}
const CreateRocketDialog = ({
    noRockets,
    createRocket,
}: CreateRocketDialogProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { mutate: completeTutorialStep, status } =
        trpc.user.completeTutorialStep.useMutation();

    const { stepActive, fetchTutorial } = useTutorial({
        stepIdentity: TutorialStep.FIRSTROCKET,
    });

    const [fromExisting, setExisting] = useState(true);
    const [selected, setSelected] = useState(DefaultRockets[0].key);
    const [name, setName] = useState(
        noRockets ? `Rocket ${noRockets + 1}` : "Rocket 1"
    );

    useEffect(() => {
        if (status === "success") fetchTutorial();
    }, [status]);

    const RocketNew = () => {
        if (fromExisting)
            return (
                <Select
                    label="Select a chart"
                    className="max-w-xs"
                    defaultSelectedKeys={[selected]}
                    onChange={(e) => setSelected(e.target.value)}
                >
                    {DefaultRockets.map((dRocket) => (
                        <SelectItem key={dRocket.key} value={dRocket.key}>
                            {dRocket.name}
                        </SelectItem>
                    ))}
                </Select>
            );
        return (
            <Input
                type="text"
                placeholder="Rocket name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        );
    };

    return (
        <>
            <Button
                variant={"ghost"}
                onClick={onOpen}
                data-testid={"create-rocket-btn"}
                className={cn("", {
                    "animate-pulse-border border-2 rounded-md": stepActive,
                })}
            >
                <PlusCircle className={cn("w-5 h-5")} />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex items-center gap-1">
                                Create new rocket
                                <PlusCircle className="w-5 h-5" />
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex justify-between gap-1">
                                    <div className="flex flex-1">
                                        {RocketNew()}
                                    </div>
                                    <div className="flex flex-1 items-center justify-end gap-1">
                                        <span>From existing</span>
                                        <Switch
                                            size="sm"
                                            isSelected={fromExisting}
                                            onChange={() =>
                                                setExisting((prev) => !prev)
                                            }
                                        />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    variant={"outline"}
                                    onClick={(e) => {
                                        onClose();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant={"default"}
                                    onClick={(e) => {
                                        if (stepActive)
                                            completeTutorialStep({
                                                currentStep:
                                                    TutorialStep.FIRSTROCKET,
                                            });
                                        createRocket({
                                            name: fromExisting
                                                ? selected
                                                : name,
                                            fromExisting,
                                        });
                                        onClose();
                                    }}
                                    data-testid={"create-rocket-confirm-btn"}
                                    className={cn("", {
                                        "animate-pulse-border border-2 rounded-md":
                                            stepActive,
                                    })}
                                >
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateRocketDialog;
