"use client"
import React from 'react'
import {insertIntoBoardListTable,} from "@/lib/actions/insertActions";
import {useRouter} from "next/navigation";
import {toast} from "@/hooks/use-toast";


const AddListButton = ({board_id}:{board_id:string}) => {
    const router = useRouter();
    const handleClick = async () => {
        try {
           const insert =  await insertIntoBoardListTable(board_id);
           if(insert!.status === "SUCCESS"){
               router.refresh()
               toast({
                   title: "Success",
                   description:"Job Board created",
                   variant: "default"
               });

           }
        } catch (e) {
            return {status: "FAILED", error: e}
        }

    }
    return (
        <>
            <button onClick={()=>{
                void (async ()=>{
                    await handleClick();
                })();
            }} key="submit">
                <h3 className="uppercase ">ADD here</h3>
            </button>
        </>
    )
}
export default AddListButton
