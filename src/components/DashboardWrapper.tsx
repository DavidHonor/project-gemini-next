"use client";

import { Loader2 } from "lucide-react";
import {
    RocketContext,
    RocketContextProvider,
} from "./RocketEditor/RocketContext";
import React, { useContext, useEffect } from "react";
import RocketCanvas from "./RocketEditor/RocketCanvas";

const DashboardWrapper = ({ rocketId }: { rocketId: string }) => {
    const { rocket, isLoading, getRocket } = useContext(RocketContext);

    useEffect(() => {
        getRocket(rocketId);
    }, []);

    if (isLoading)
        return <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />;

    return (
        <div className="flex w-full justify-center max-h-[calc(100vh-3.5rem)]">
            <div className="w-1/4 h-[calc(100vh-3.5rem)]"></div>
            <div className="w-[50%] h-[calc(100vh-3.5rem)]">
                <RocketCanvas rocket={rocket!} />
            </div>
            <div className="w-1/4 h-[calc(100vh-3.5rem)] break-words">
                {JSON.stringify(rocket, null, 2)}
            </div>
        </div>
    );
};

export default DashboardWrapper;
