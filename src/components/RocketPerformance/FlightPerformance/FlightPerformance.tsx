import React, { useContext, useEffect, useState } from "react";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Select,
    SelectItem,
} from "@nextui-org/react";

import { Button } from "@/components/ui/button";
import { RocketContext } from "@/components/RocketEditor/RocketContext";
import LineChart from "@/components/LineChart/LineChart";
import { FlightData } from "@/types/rocket_stats";
import { BarChart } from "lucide-react";

const FlightPerformance = () => {
    const { stats } = useContext(RocketContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [flightData, setData] = useState<FlightData>();
    const [selectedChart, setSelected] = useState("massOverTime");

    useEffect(() => {
        if (isOpen && stats) {
            const flightStats = stats.getFlightData();
            setData(flightStats);
        }
    }, [isOpen]);

    return (
        <>
            <Button variant={"outline"} onClick={onOpen}>
                <span className="text-xs lg:text-base">Show charts</span>
                <BarChart className="w-4 h-4 ml-1" />
            </Button>
            <Modal
                placement="center"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col justify-between">
                                Flight stats
                                <Select
                                    label="Select a chart"
                                    className="max-w-xs"
                                    defaultSelectedKeys={[selectedChart]}
                                    onChange={(e) =>
                                        setSelected(e.target.value)
                                    }
                                >
                                    <SelectItem
                                        key={"massOverTime"}
                                        value={"massOverTime"}
                                    >
                                        Mass over time
                                    </SelectItem>
                                    <SelectItem
                                        key={"twrOverTime"}
                                        value={"twrOverTime"}
                                    >
                                        Twr over time
                                    </SelectItem>
                                    <SelectItem
                                        key={"altitudeOverTime"}
                                        value={"altitudeOverTime"}
                                    >
                                        Altitude over time
                                    </SelectItem>
                                    <SelectItem
                                        key={"velocityOverTime"}
                                        value={"velocityOverTime"}
                                    >
                                        Velocity over time
                                    </SelectItem>
                                    <SelectItem
                                        key={"dragOverTime"}
                                        value={"dragOverTime"}
                                    >
                                        Drag over time
                                    </SelectItem>
                                    <SelectItem
                                        key={"dragOverAltitude"}
                                        value={"dragOverAltitude"}
                                    >
                                        Drag over altitude
                                    </SelectItem>
                                    <SelectItem
                                        key={"gravityForceOverAltitude"}
                                        value={"gravityForceOverAltitude"}
                                    >
                                        Gravity force over altitude
                                    </SelectItem>
                                </Select>
                            </ModalHeader>
                            <ModalBody>
                                {flightData ? (
                                    <LineChart
                                        flightData={flightData}
                                        selectedChart={selectedChart}
                                    />
                                ) : null}
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
