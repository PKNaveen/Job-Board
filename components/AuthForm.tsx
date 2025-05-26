"use client"
import React, {useEffect} from 'react'
import Image from "next/image";
import { useRouter } from "next/navigation";
import {signInWithGoogle, UpdateDatabase} from "@/lib/actions/authActions";



const AuthForm = ({session,data}: {session: any; data:any}) => {

    const router = useRouter();
    const id:string = data[0]?.id;

    useEffect(() => {
        if(session){

            UpdateDatabase();
            router.push(`/boards/${id}`);
        }
    })

    return (

        // TODO
        // Change authform to add linkedin and google
        <div className="flex-row gap-2">
            <div className="flex">
                <div className="flex bg-dark-400 w-full py-2 rounded-xl ">
                    <form action={signInWithGoogle}>
                        <button className="flex gap-3 px-28 w-full text-text-main">
                            <Image src="/vercel.svg" alt="test" width={16} height={16} className=""/>
                            Continue with Google
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default AuthForm
