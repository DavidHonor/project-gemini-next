import React, { useState } from "react";
import {
    ChevronLeftCircle,
    ChevronRight,
    ChevronRightCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import RocketEditorMenu from "../RocketEditorMenu/RocketEditorMenu";
import { cn } from "@/lib/utils";

const RocketEditorMenuMobile = () => {
    const [open, setOpen] = useState(false);

    const actionIcon = () => {
        if (!open) return <ChevronRightCircle className="w-5 h-5" />;
        return <ChevronLeftCircle className="w-5 h-5" />;
    };

    return (
        <>
            <Button
                variant={"ghost"}
                className="absolute left-0 top-1/2 p-1"
                style={{ zIndex: 32 }}
                onClick={() => setOpen((state) => !state)}
            >
                {actionIcon()}
            </Button>
            <div
                className={cn(
                    "absolute inset-y-0 left-0 flex flex-col w-full h-[calc(100vh-3.5rem)] ps-1 pe-1 bg-white transition-all duration-300",
                    {
                        "translate-x-0 opacity-100": open,
                        "-translate-x-full opacity-0 pointer-events-none -z-10":
                            !open,
                    }
                )}
                style={{ zIndex: 31 }}
            >
                <RocketEditorMenu />
            </div>
        </>
    );
};

export default RocketEditorMenuMobile;
