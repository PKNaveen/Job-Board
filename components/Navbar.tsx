"use client"
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {sidebarLinks} from "@/lib";
import {useParams, usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {signOutWithGoogle} from "@/lib/actions/authActions";

const Navbar = ({data}:{data:any}) => {
    const pathName = usePathname();
    const params = useParams();
    const id = params?.id as string | "";
    const imgUrl:string = data[0]?.img;
    return (
        <header className="backdrop-blur bg-dark-200 border-b-2 border-dark-275 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
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
                <nav className="flex gap-6">
                    {sidebarLinks.map((item) => {
                        const route = item.route(id); // get full route with id
                        const isActive = pathName === route || pathName.startsWith(`${route}/`);

                        return (
                            <Link
                                href={route}
                                key={item.label}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded hover:bg-dark-300 hover:shadow-md transition",
                                    {
                                        "bg-dark-300 text-white font-semibold": isActive,
                                        "text-gray-300": !isActive,
                                    }
                                )}
                            >
                                <div className="relative w-5 h-5">
                                    <Image
                                        src={item.imgUrl}
                                        alt={item.label}
                                        fill
                                        className={cn("object-contain", {
                                            "brightness-[3] invert-0": isActive,
                                        })}
                                    />
                                </div>
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Side: Avatar or Icon + Sign Out */}
                <div className="flex items-center gap-10">
                    <Image
                        src={imgUrl} // replace with your `imgUrl` prop or logic
                        alt="user avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                    <form action={
                        signOutWithGoogle}>
                        <button
                            type="submit"
                            className="text-sm text-text-header font-bold bg-dark-test px-3 py-1 rounded hover:bg-dark-300 transition"
                        >
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>
        </header>
    )
}
export default Navbar
