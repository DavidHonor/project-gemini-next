import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const page = () => {
    return (
        <MaxWidthWrapper>
            <div className="flex pt-10 pb-10 lg:pt-20 w-full justify-center">
                <div className="flex flex-col space-y-4">
                    <AppOverview />

                    <SimulationCard />

                    <ContactCard />
                </div>
            </div>
        </MaxWidthWrapper>
    );
};

const AppOverview = () => {
    return (
        <div className="flex max-w-[600px] justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-y-3">
                        <span className=" ">
                            Build a rocket from parts, orgonize stages, view
                            performance details, 2D plots, 3D trajectory.
                            Configure flight parameters, such as heading,
                            simulation length, climb rate.
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
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
                    <div className="flex gap-x-1">
                        <span>Levente Kovács -</span>
                        <a
                            href="mailto:kovacs.levente.csanad@gmail.com"
                            className="text-blue-600 hover:text-blue-800 break-words"
                        >
                            kovacs.levente.csanad@gmail.com
                        </a>
                    </div>

                    <div className="flex gap-x-1">
                        <span>Project link -</span>
                        <a
                            href="https://github.com/DavidHonor/project-gemini-next"
                            className="text-blue-600 hover:text-blue-800 break-words"
                            target="_blank"
                        >
                            github.com/DavidHonor/project-gemini-next
                        </a>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default page;
