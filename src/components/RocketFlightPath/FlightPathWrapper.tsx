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
import { toast } from "../ui/use-toast";

const FlightPathWrapper = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [globeImage, setGlobeImage] = useState("/world_small.jpg");

    function loadHighRes() {
        const highResImage = new Image();
        highResImage.src = "/world_large.jpg";
        highResImage.onload = () => {
            console.log("HIGH RES LOADED");
            setGlobeImage(highResImage.src);
        };
        highResImage.onerror = () => {
            toast({
                title: "could not load texture",
            });
        };
    }

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
                            <ModalHeader className="flex">
                                <Button
                                    variant={"ghost"}
                                    onClick={() => loadHighRes()}
                                >
                                    Load highres texture
                                </Button>
                            </ModalHeader>
                            <ModalBody className="flex items-center justify-center">
                                <RocketFlightPath globeImage={globeImage} />
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
