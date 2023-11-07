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

//import RocketFlightPath from "./FlightPath";

import dynamic from "next/dynamic";
const FlightPathNoSSR = dynamic(() => import("./FlightPath"), {
    ssr: false,
});

import { toast } from "../ui/use-toast";
import { LaunchConfigType } from "@/config/rocket_parts";

interface FlightPathWrapperProps {
    useDefaultConfig: boolean;
    launchConfig: LaunchConfigType;
}
const FlightPathWrapper = ({
    useDefaultConfig,
    launchConfig,
}: FlightPathWrapperProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [globeImage, setGlobeImage] = useState("/world_small.jpg");

    function loadHighRes() {
        const highResImage = new Image();
        highResImage.src = "/world_large.jpg";
        highResImage.onload = () => {
            toast({ title: "Textures loaded" });
            setGlobeImage(highResImage.src);
        };
        highResImage.onerror = () => {
            toast({
                title: "Could not load textures",
            });
        };
    }

    return (
        <>
            <Button variant={"outline"} onClick={onOpen}>
                <span className="text-xs lg:text-base">3D trajectory</span>
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
                                    variant={"outline"}
                                    onClick={() => loadHighRes()}
                                >
                                    Load highres textures
                                </Button>
                            </ModalHeader>
                            <ModalBody className="flex items-center justify-center">
                                <FlightPathNoSSR
                                    useDefaultConfig={useDefaultConfig}
                                    launchConfig={launchConfig}
                                    globeImage={globeImage}
                                />
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
