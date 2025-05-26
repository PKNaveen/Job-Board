import React from 'react'
import Sidebar from "@/components/Sidebar";
import {auth} from "@/auth";
import {db} from "@/database/drizzle";
import {usersTable} from "@/database/schema";
import {eq} from "drizzle-orm";
import Navbar from "@/components/Navbar";



const Layout = async ({children}: { children: React.ReactNode }) => {
    const session = await auth();
    const email: string = session?.user?.email ?? "";
    const data = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);

    return (
        <>

                <main className="flex flex-col h-screen overflow-hidden bg-[#101012]">
                    <Navbar data={data}/>
                    <div className="flex flex-1 overflow-hidden">
                    <section className=" w-auto flex-1 overflow-x-auto">{children}</section>
                    </div>
                </main>
        </>
    )
}
export default Layout
