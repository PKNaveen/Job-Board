import React from 'react'
import Sidebar from "@/components/Sidebar";
import {auth} from "@/auth";
import {db} from "@/database/drizzle";
import {board, usersTable} from "@/database/schema";
import {eq} from "drizzle-orm";
import PopUpDialogBox from "@/components/PopUpDialogBox";

const Layout = async ({children}: { children: React.ReactNode }) => {
    const session = await auth();
    const email: string = session?.user?.email ?? "";
    const data = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    const userID = data[0]?.id;
    const board_data = await db.select().from(board).where(eq(board.user_id, userID)).limit(1);

    return (
        <>
        <main>
            <section>
                <Sidebar
                data={data}
                />
            </section>
            {board_data.length === 0 ? <PopUpDialogBox data={data} /> : null}
            <div>{children}</div>
        </main>
        </>
    )
}
export default Layout
