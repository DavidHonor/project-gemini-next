import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const page = () => {
    return (
        <MaxWidthWrapper>
            <div className="flex pt-20 w-full justify-center">
                <div className="flex flex-col space-y-4">
                    <SimulationCard />

                    <ContactCard />
                </div>
            </div>
        </MaxWidthWrapper>
    );
};

const SimulationCard = () => {
    return (
        <div className="flex max-w-[600px] justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Simulation accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-y-3">
                        <span className="font-semibold ">
                            The simulation uses a simplified model, for the
                            rocket as well as other forces acting on it.
                        </span>

                        <span>
                            The flight trajectory is calculated in 2D then
                            projected to the 3D globe. I used the Ruggen-Kutta
                            4th order method to calculate the flight path.
                        </span>

                        <span>
                            The change in air density, and velocity for the drag
                            force, and the altitude for the gravitational force
                            is taken into a count.
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const ContactCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Contact info</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col max-w-[600px]">
                    <div className="grid grid-cols-2 text-lg gap-x-2">
                        <span>Made by:</span>
                        <span>Levente Kovács</span>
                    </div>
                    <div className="grid grid-cols-2 text-lg gap-x-2">
                        <span>Contact:</span>
                        <a
                            href="mailto:kovacs.levente.csanad@gmail.com"
                            className="text-blue-600 hover:text-blue-800 break-words"
                        >
                            kovacs.levente.csanad@gmail.com
                        </a>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default page;
