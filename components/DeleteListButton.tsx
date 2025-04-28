"use client"
import React, {useState} from 'react'
import {Trash2} from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {deleteBoardList} from "@/lib/actions/deleteActions";
import {useRouter} from "next/navigation";


const DeleteListButton = ({board_list_id,position,board_id}:{board_list_id:string,position:number,board_id:string}) => {
    const [open, setOpen] = useState(false)
    const router = useRouter();

    // Use Effect is only needed when component is mounted
    // i.e. You want to show alert box when you click the three dots
    // However in this case only we need to show it when delete is clicked

    const handleDelete = async ()=>{
        try {
            await deleteBoardList(board_list_id,position,board_id);
            setOpen(false)
            router.refresh();
        }
        catch (error){
            return {status:"FAILED", error:error}
        }
    }
    return (
        <>
            <button
                className="flex-between uppercase w-full px-2 py-1 hover:bg-dark-400"
                onClick={() => setOpen(true)}
            >
                delete
                <Trash2/>
            </button>

            {/*Instead of nesting inside button we use useState to call if condition is true then only mount the value. Else this popup is never mounted*/}
            {open &&(

                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                list and all associated cards.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg outline-solid hover:bg-dark-400"
                            >
                                Delete
                            </button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}


        </>
    )
}
export default DeleteListButton
