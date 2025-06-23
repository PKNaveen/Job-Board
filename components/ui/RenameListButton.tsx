"use client"
import React, {useActionState, useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Pencil, Send} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {renameListValidation} from "@/lib/validation";
import {updateListName} from "@/lib/actions/updateActions";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {z} from "zod";

const RenameListButton = ({
                              name,
                              id,
                              open,
                              setOpen,
                              onSuccess,
                          }: {
    name: string;
    id: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    onSuccess?: () => void;
}) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter()
    
    const handleRenameListAction = async (prevState:any, formData:FormData) =>{

        const formValues= {
            name:formData.get("name") as string,
        }
        try{

            await renameListValidation.parseAsync({
                name:formValues.name,
            })

            const updateList = await updateListName(id,formValues.name)

            if(updateList.status === "SUCCESS") {
                toast.success("Renamed", { duration: 1000 });
                router.refresh()
                setErrors({})
                setOpen(false)
                onSuccess?.()
            }

        }
        catch (e) {
            if (e instanceof z.ZodError) {
                const fieldErrors = e.flatten().fieldErrors;
                const newErrors: Record<string, string> = {};
                console.log(e)
                if (fieldErrors.name?.length) {
                    newErrors.name = fieldErrors.name[0];
                }
            }
            toast.error('Error',{
                description:"An unexpected error has occurred",
            })
            return {
                ...prevState,
                error: "An unexpected error occurred.",
                status: "ERROR",
            };
        }

    }
    const [, formAction, isPending] = useActionState(handleRenameListAction, {
        error: "",
        status: "INITIAL",

    });
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-dark-test border border-dark-300 [&>button]:text-text-header ">
                <DialogHeader>
                    <DialogTitle className="title-text-header">Rename List</DialogTitle>
                </DialogHeader>
                <form action={formAction}>
                        <div className="py-2 gap-4">

                            {/*Input not able to type */}
                            <Input
                                id="name"
                                name="name"
                                className="text-header-title-default"
                            />
                            {errors.name && <p className="startup-form-error">{errors.name}</p>}
                        </div>
                    <div className=" flex flex-col py-6 ">
                        <Button type="submit" className="bg-dark-300 text-white hover:bg-dark-400 font-semibold ">
                            {isPending ? "Submitting...." : "Submit"}
                            <Send className="size-6 ml-2"/>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default RenameListButton
