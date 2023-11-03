import React, { useContext, useEffect } from "react";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";

import { Button } from "@/components/ui/button";
import { RocketContext } from "@/components/RocketEditor/RocketContext";

const FlightPerformance = () => {
    const { stats } = useContext(RocketContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    if (!stats) return "";

    useEffect(() => {
        if (isOpen) {
            const flightStats = stats.getFlightData();
            console.log(flightStats);
        }
    }, [isOpen]);

    return (
        <>
            <Button variant={"ghost"} onClick={onOpen}>
                Open Modal
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Modal Title
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit
                                    amet hendrerit risus, sed porttitor quam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant={"ghost"}
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default FlightPerformance;
