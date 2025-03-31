"use client"
import React, {useEffect} from 'react'
import Image from "next/image";
import { useRouter } from "next/navigation";
import {signInWithGoogle, UpdateDatabase} from "@/lib/actions/authActions";



function stringToHashCode(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) >>> 0; // Prime multiplier 31
    }
    return hash.toString(36); // Convert to alphanumeric base36
}

const AuthForm = ({session,data}: {session: any; data:any}) => {
    const router = useRouter();
    const id:string = stringToHashCode(data[0]?.id);

    useEffect(() => {
        if(session){

            UpdateDatabase();
            router.push(`/boards/${id}`);
        }
    })

//     now useRouter in a client component
    return (

        // TODO
        // Change authform to add linkedin and google
        <div className="flex-row gap-2">
            <div className="flex">
                <div className="flex bg-[#414249] w-full py-2 rounded-xl ">
                    <form action={signInWithGoogle}>
                        <button className="flex gap-3 px-28 w-full">
                            <Image src="/vercel.svg" alt="test" width={16} height={16}/>
                            Continue with Google
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default AuthForm
