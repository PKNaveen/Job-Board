"use client"
import Link from "next/link";
import Image from "next/image";
import {MainNavLinks} from "@/lib";
import {cn} from "@/lib/utils";
import React from "react";

const MainNavbar = () => {
    return (
        <header className="backdrop-blur bg-[#090a0a] border-b-2 border-dark-275 ">
            <div className="max-w-5xl mx-auto px-4 flex justify-between h-16 sm:px-6 lg:px-8 ">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.svg"
                        width={40}
                        height={40}
                        alt="Horizon logo"
                        className="h-10 w-10"
                    />
                    <span className="text-xl font-bold uppercase text-text-header">Seeker</span>
                </Link>

                {/* Navigation Links */}
                <nav className="flex gap-6 items-center ">
                    {MainNavLinks.map((item) => {

                        return (
                            <Link
                                href={item.route}
                                key={item.label}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-dark-300 hover:shadow-md transition text-light-100 font-bold hover:text-white ",
                                )}
                            >
                                <span className="">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="flex-between">
                    <Link href="/sign-in"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-light-100 hover:bg-white hover:shadow-md transition ">
                    <span className="text-primary font-semibold">Sign In</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default MainNavbar
