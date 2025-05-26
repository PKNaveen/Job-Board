"use client"
import React from 'react'
import {insertIntoBoardListTable,} from "@/lib/actions/insertActions";
import {toast} from "@/hooks/use-toast";
import {Plus} from "lucide-react";


const AddListButton = ({board_id,onSuccess}:{board_id:string,onSuccess:any}) => {
    const handleClick = async () => {
        try {
           const insert =  await insertIntoBoardListTable(board_id);
           if(insert?.status === "SUCCESS"){
               onSuccess?.();
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

            <button onClick={()=>{
                void (async ()=>{
                    await handleClick();
                })();
            }} key="submit" className="min-w-[250px] p-2 py-3.5 rounded-xl bg-dark-200 shadow-md border-black border border-solid outline-none drop-shadow-md justify-between items-center">
                <div className="">
                <h3 className="uppercase font-semibold text-text-header">ADD here</h3>
                    <div className="px-32 py-0.5">
                        <Plus color="#ffff"/>
                    </div>
                </div>
            </button>
    )
}
export default AddListButton
