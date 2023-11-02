"use client";

import { RocketContext } from "../RocketEditor/RocketContext";
import React, { useContext, useEffect } from "react";
import RocketCanvas from "../RocketEditor/RocketCanvas";
import RocketEditorMenu from "../RocketEditorMenu/RocketEditorMenu";
import RocketEditorMenuMobile from "../RocketEditorMenuMobile/RocketEditorMenuMobile";

const DashboardWrapper = ({ rocketId }: { rocketId: string }) => {
    const { rocket, getRocket } = useContext(RocketContext);

    useEffect(() => {
        getRocket(rocketId);
    }, []);

    return (
        <div className="flex w-full justify-center max-h-[calc(100vh-3.5rem)] overflow-hidden overscroll-none">
            {/* mobile layout */}
            <div className="md:hidden flex w-full h-[calc(100vh-3.5rem)] relative">
                {/* calls RocketEditorMenu, but adds controls */}
                <RocketEditorMenuMobile />

                <RocketCanvas rocket={rocket!} />
            </div>

            {/* desktop layout */}
            <div className="hidden md:flex w-full h-full">
                <div className="flex flex-col w-1/4 h-[calc(100vh-3.5rem)] ps-1 pe-1 border-r border-zinc-200">
                    <RocketEditorMenu />
                </div>

                <div className="w-[75%] h-[calc(100vh-3.5rem)]">
                    <RocketCanvas rocket={rocket!} />
                </div>
            </div>
        </div>
    );
};

export default DashboardWrapper;
