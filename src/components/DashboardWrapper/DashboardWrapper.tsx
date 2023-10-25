"use client";

import { Loader2 } from "lucide-react";
import { RocketContext } from "../RocketEditor/RocketContext";
import React, { useContext, useEffect } from "react";
import RocketCanvas from "../RocketEditor/RocketCanvas";
import RocketPartsList from "../RocketEditor/RocketPartsList";

const DashboardWrapper = ({ rocketId }: { rocketId: string }) => {
    const { rocket, getRocket } = useContext(RocketContext);

    useEffect(() => {
        getRocket(rocketId);
    }, []);

    return (
        <div className="flex w-full justify-center max-h-[calc(100vh-3.5rem)] overflow-hidden">
            {/* mobile layout */}
            <div className="md:hidden flex w-full h-full">
                <RocketCanvas rocket={rocket!} />
            </div>

            {/* desktop layout */}
            <div className="hidden md:flex w-full h-full">
                <div className="flex flex-col w-1/4 h-[calc(100vh-3.5rem)] ps-2 pe-2 border-r border-zinc-200">
                    <RocketPartsList />
                </div>
                <div className="w-[75%] h-[calc(100vh-3.5rem)]">
                    <RocketCanvas rocket={rocket!} />
                </div>
                {/* <div className="w-1/4 h-[calc(100vh-3.5rem)] border-l border-zinc-200"></div> */}
            </div>
        </div>
    );
};

export default DashboardWrapper;
