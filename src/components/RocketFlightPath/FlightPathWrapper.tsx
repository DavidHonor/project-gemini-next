import React, { useContext, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Loader2, Plane } from "lucide-react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";

import { toast } from "../ui/use-toast";
import { LaunchConfigType } from "@/config/rocket_parts";
import GlobeWrapper from "../GlobeGL/GlobeWrapper";
import { RocketContext } from "../RocketEditor/RocketContext";
import { generateGlobeLabels } from "@/lib/ship_functions";

interface FlightPathWrapperProps {
    useDefaultConfig: boolean;
    launchConfig: LaunchConfigType;
}
const FlightPathWrapper = ({
    useDefaultConfig,
    launchConfig,
}: FlightPathWrapperProps) => {
    const { stats } = useContext(RocketContext);

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

    const trajectories = useMemo(() => {
        if (stats && isOpen) {
            let rk4 = useDefaultConfig
                ? stats.trajectoryRK4().trajectories
                : stats.trajectoryRK4(launchConfig).trajectories;
            return rk4;
        }
        return undefined;
    }, [stats, isOpen]);

    const labels = useMemo(() => {
        if (trajectories) {
            return generateGlobeLabels(trajectories);
        }
    }, [trajectories]);

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
                                {trajectories && labels ? (
                                    <GlobeWrapper
                                        trajectories={trajectories}
                                        labels={labels}
                                        globeImage={globeImage}
                                    />
                                ) : (
                                    <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
                                )}
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
