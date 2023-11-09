import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight, InfoIcon } from "lucide-react";

import RocketSample from "@/components/RocketSample/RocketSample";
import Link from "next/link";

export default function Home() {
    return (
        <MaxWidthWrapper>
            <div className="w-full flex flex-col justify-center items-center text-center mt-28 sm:mt-40">
                <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
                    <p className="text-sm font-semibold text-gray-700">
                        Try Project gemini out!
                    </p>
                </div>

                <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
                    Build your own <span className="text-blue-600">rocket</span>{" "}
                    in seconds.
                </h1>
                <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
                    Build your rocket with a few clicks, drag and drop parts,
                    check the results
                </p>

                <div className="flex gap-2 items-center justify-center mt-5">
                    <Link
                        href={"/about"}
                        className={buttonVariants({
                            size: "lg",

                            variant: "outline",
                        })}
                    >
                        About
                        <InfoIcon className="ml-1.5 h-5 w-5" />
                    </Link>

                    <RegisterLink
                        className={buttonVariants({
                            size: "lg",
                        })}
                    >
                        <span className="font-bold ">Get started</span>
                        <ArrowRight className="ml-1.5 h-5 w-5" />
                    </RegisterLink>
                </div>

                <RocketSample />
            </div>
        </MaxWidthWrapper>
    );
}
