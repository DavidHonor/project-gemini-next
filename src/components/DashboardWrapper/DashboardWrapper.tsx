"use client";

import { Loader2 } from "lucide-react";
import { RocketContext } from "../RocketEditor/RocketContext";
import React, { useContext, useEffect } from "react";
import RocketCanvas from "../RocketEditor/RocketCanvas";
import RocketPartsList from "../RocketEditor/RocketPartsList";

const DashboardWrapper = ({ rocketId }: { rocketId: string }) => {
    const { rocket, isLoading, getRocket } = useContext(RocketContext);

    useEffect(() => {
        getRocket(rocketId);
    }, []);

    if (isLoading)
        return <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />;

    return (
        <div className="flex w-full justify-center max-h-[calc(100vh-3.5rem)]">
            {/* mobile layout */}
            <div className="md:hidden flex w-full h-full">
                <RocketCanvas rocket={rocket!} />
            </div>

            {/* desktop layout */}
            <div className="hidden md:flex w-full h-full">
                <div className="flex flex-col w-1/4 h-[calc(100vh-3.5rem)] ps-2 pe-2 border-r border-zinc-200">
                    <RocketPartsList />
                </div>
                <div className="w-[50%] h-[calc(100vh-3.5rem)]">
                    <RocketCanvas rocket={rocket!} />
                </div>
                <div className="w-1/4 h-[calc(100vh-3.5rem)] break-words"></div>
            </div>
        </div>
    );
};

export default DashboardWrapper;
