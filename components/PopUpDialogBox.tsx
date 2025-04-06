"use client"
import React, {useActionState, useEffect, useState} from 'react'
import {
    AlertDialog, AlertDialogAction,AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Input} from "@/components/ui/input";
import {insertIntoBoardTable} from "@/lib/actions/insertActions";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";


const PopUpDialogBox = ({data}:{data:any}) => {
    const router = useRouter();

    const [open, setOpen] = useState(false)

    useEffect(() => {
        // Automatically open the dialog when the component mounts
        setOpen(true)
    }, [])

    const handleFormSubmit = async (prevState:any, formData:FormData)=>{
        try {
            const formValues={
                    user_id:data[0]?.id,
                    name:formData.get("name") as string,
            }

            const result = await insertIntoBoardTable(formValues.user_id,formValues.name);
            if(result.status=="SUCCESS"){

                setOpen(false)

                await new Promise(resolve => setTimeout(resolve, 1000))

                router.refresh();
                toast({
                    title: "Success",
                    description:"Job Board created",
                    variant: "default"
                });
            }

        }
        catch (error) {
            return { status: "ERROR", error: "Something went wrong" };
        }
    }
    const [state, formAction] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",

    });

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Setup Board Name</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please enter a name for your Job Board Application Tracker
                    </AlertDialogDescription>
                </AlertDialogHeader>
                    <form action={formAction}>
                        <Input
                            id="name"
                            name="name"
                            className=""
                            placeholder="Job Board Name"/>
                <AlertDialogFooter>
                    <AlertDialogAction type="submit" >Continue</AlertDialogAction>
                </AlertDialogFooter>
                    </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default PopUpDialogBox
