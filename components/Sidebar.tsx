"use client"
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {sidebarLinks} from "@/lib";
import {cn} from "@/lib/utils";
import {signOutWithGoogle} from "@/lib/actions/authActions";


const Sidebar =({data}:{data:any}) => {
    const pathName = usePathname();
    const imgUrl:string = data[0]?.img;
    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
                    <Image
                        src="/logo.svg"
                        width={34}
                        height={34}
                        alt="Horizon logo"
                        className="size-[64px]"
                    />
                    <h1 className="sidebar-logo-text">trackhire</h1>

                </Link>



                    {sidebarLinks.map(item => {
                        const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)

                        return (
                            <Link href={item.route} key={item.label}
                                  className={cn('sidebar-link', {'bg-[#737381]': isActive})}>
                                <div className="relative size-6">
                                    <Image src={item.imgUrl} alt={item.label} fill
                                           className={cn({'brightness-[3] invert-0': isActive})}/>
                                </div>
                                <p className={cn('sidebar-label', {'text-white': isActive})}>{item.label}</p>
                            </Link>
                        )
                    })}

            </nav>

            <Image src={imgUrl} alt={imgUrl} width={24} height={24}/>
            <form action={signOutWithGoogle}>
                <button>
                    Sign Out
                </button>
            </form>
        </section>
    )
}
export default Sidebar
