import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plane } from "lucide-react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import RocketFlightPath from "./FlightPath";

const FlightPathWrapper = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button variant={"outline"} onClick={onOpen}>
                <span className="text-xs lg:text-base">Show flight path</span>
                <Plane className="w-4 h-4 ml-1" />
            </Button>
            <Modal
                size="full"
                placement="center"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col justify-between"></ModalHeader>
                            <ModalBody>
                                <RocketFlightPath />
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

export default FlightPathWrapper;
