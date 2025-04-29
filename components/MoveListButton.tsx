"use client"
import React, {useState} from 'react'
import {ArrowRightLeft} from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {updatePosition} from "@/lib/actions/updateActions";
import {useRouter} from "next/navigation";
import {BoardItem, data} from "@/lib/props";



export const MoveListButton = ({board_data,current_item,board_id}:{board_data:data[],current_item:BoardItem,board_id:string}) => {
    const [open,setOpen] = useState(false);
    const [value, setValue] = useState(``);
    const router = useRouter();
   // console.log(board_id);

    const handleMoveList = async ()=>{
        try{
            await updatePosition(current_item.position,value,board_id)
            // console.log(value,current_item.position)
            setOpen(false)
            router.refresh();
        }
        catch (error){
            return {status: "FAILED", error:error}
        }
    }

    return (
        <>
            <button
                className="flex-between uppercase w-full gap-2 hover:bg-dark-400"
                onClick={() => {setOpen(true);}}
            >
                Move List
                <ArrowRightLeft/>
            </button>

            {/*Instead of nesting inside button we use useState to call if condition is true then only mount the value. Else this popup is never mounted*/}
            {open &&(

                <AlertDialog open={open} onOpenChange={(open) => {setOpen(open);}}>
                    <AlertDialogContent className="">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Move List</AlertDialogTitle>
                            <AlertDialogDescription>
                                Choose a position to move current list
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="mx-auto w-fit">
                        <Select value={value} onValueChange={setValue}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={`${current_item.position} - ${current_item.list_name} (Current)`} />
                            </SelectTrigger>
                            <SelectContent >
                            {board_data.map((i: BoardItem,index:number) => (
                                        <SelectItem
                                            key={index}
                                            value={`${i.position}`}
                                            disabled={current_item.position === i.position}
                                        >
                                            {i.position} - {i.list_name}
                                            {current_item.position === i.position && "(Current)"}
                                        </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <button
                                className="px-4 py-2 rounded-lg outline-solid hover:bg-dark-400"
                                onClick={() => {void handleMoveList();}}
                            >
                                Move List
                            </button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}


        </>
    )
}
