"use server";

import {auth, signIn, signOut} from "@/auth";
import {db} from "@/database/drizzle";
import {usersTable} from "@/database/schema";
import {eq} from "drizzle-orm";


export async function signInWithGoogle() {
    await signIn("google");

}

export async function signOutWithGoogle() {
    await signOut({redirectTo: "/sign-in"});
}

export async function UpdateDatabase() {
    const session = await auth();
    const sessionEmail:string = session?.user?.email || "";
    const sessionName:string = session?.user?.name || "";
    const sessionImgUrl:string = session?.user?.image || "";

    const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, sessionEmail))
        .limit(1)

    if(existingUser.length === 0){
        try {
            await db.insert(usersTable).values({
                name:sessionName,
                email:sessionEmail,
                img:sessionImgUrl,
            });
        }
        catch (error) {
            console.log(error, "Sign In Error");
        }
    }
}
