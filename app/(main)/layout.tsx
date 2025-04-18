import React from 'react'
import Sidebar from "@/components/Sidebar";
import {auth} from "@/auth";
import {db} from "@/database/drizzle";
import {usersTable} from "@/database/schema";
import {eq} from "drizzle-orm";



const Layout = async ({children}: { children: React.ReactNode }) => {
    const session = await auth();
    const email: string = session?.user?.email ?? "";
    const data = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);

    return (
        <main className="flex min-h-screen">
            <aside>
            <Sidebar
                data={data}
            />
            </aside>
            <section className=" w-auto overflow-x-auto">{children}</section>
        </main>
    )
}
export default Layout
