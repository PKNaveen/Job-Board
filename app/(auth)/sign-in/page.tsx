import React from 'react'
import AuthForm from "@/components/AuthForm";
import {auth} from "@/auth";
import {db} from "@/database/drizzle";
import {usersTable} from "@/database/schema";
import {eq} from "drizzle-orm";



const Page = async () => {
    const session = await auth();
    const email:string = session?.user?.email ?? "";
    const data = await db.select().from(usersTable).where(eq(usersTable.email,email)).limit(1);


    return (
        <AuthForm
        session={session}
        data={data}
        />
    )
}
export default Page
