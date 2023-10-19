import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

import Canvas from "../../components/RocketEditor/Canvas";
import { db } from "@/db";
import RocketList from "@/components/RocketList/RocketList";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Dashboard = async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id,
        },
    });
    if (!dbUser) redirect("/auth-callback?origin=dashboard");

    return (
        <div className="w-full h-[calc(100vh-3.5rem)] ">
            <div className="hidden h-[calc(100vh-3.5rem)] sm:flex flex-row ">
                <MaxWidthWrapper>
                    <RocketList />
                </MaxWidthWrapper>
            </div>
        </div>
    );
};

export default Dashboard;
