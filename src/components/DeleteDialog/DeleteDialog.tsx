import React from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";

import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeleteDialogProps {
    deleteTitle?: string;
    deleteText?: string;
    deleteAction: () => void;
    triggerBtnClass?: string;
    triggerIconClass?: string;
}
const DeleteDialog = ({
    deleteAction,
    deleteTitle,
    deleteText,
    triggerBtnClass,
    triggerIconClass,
}: DeleteDialogProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const title = deleteTitle ? deleteTitle : "Delete item";

    const body = deleteText
        ? deleteText
        : "Are your sure you want to delete this?";

    return (
        <>
            <Button
                variant={"outline"}
                onClick={onOpen}
                className={triggerBtnClass ?? ""}
            >
                <Trash2 className={cn("w-5 h-5", triggerIconClass)} />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex items-center gap-1">
                                {title}
                                <Trash2 className="w-5 h-5" />
                            </ModalHeader>
                            <ModalBody>{body}</ModalBody>
                            <ModalFooter>
                                <Button
                                    variant={"outline"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        onClose();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant={"destructive"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        deleteAction();
                                    }}
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

export default DeleteDialog;
