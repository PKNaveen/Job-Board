"use client"
import React, {useActionState, useEffect, useState} from 'react'
import {
    AlertDialog,AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Input} from "@/components/ui/input";
import {insertIntoBoardTable} from "@/lib/actions/insertActions";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {boardNameSchema} from "@/lib/validation";
import {z} from "zod";


const PopUpDialogBox = ({data}:{data:any}) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
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
            // Improved Zod error detection only on name instead of all values such as uuid
            await boardNameSchema.parseAsync({ name: formValues.name });

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

        // Check for Zod error
            /*
            Expected Error:

            ZodError: [
              {
                "code": "too_small",
                "minimum": 3,
                "type": "string",
                "inclusive": true,
                "exact": false,
                "message": "String must contain at least 3 character(s)",
                "path": [
                  "name"
                ]
              }
            ]

            */
        catch (error) {

            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                const newErrors: Record<string, string> = {};

                if (fieldErrors.name && Array.isArray(fieldErrors.name) && fieldErrors.name.length > 0) {
                    newErrors.name = fieldErrors.name[0];
                }
                // Add similar checks for other expected keys
                // if (fieldErrors.email && Array.isArray(fieldErrors.email) && fieldErrors.email.length > 0) {
                //     newErrors.email = fieldErrors.email[0];
                // }

                setErrors(newErrors);

                toast({
                    title: "Error",
                    description: "Please check your inputs and try again",
                    variant: "destructive",
                });

                return { error: "Validation failed", status: "ERROR" };
            }

            toast({
                title: "Error",
                description: "An unexpected error has occurred",
                variant: "destructive",
            });

            return {
                ...prevState,
                error: "An unexpected error occurred.",
                status: "ERROR",
            };
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
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
                        {errors.name && <p className="text-red-500 text-sm py-4">{errors.name}</p>}
                <AlertDialogFooter>
                    <button type="submit" disabled={isPending} className="bg-primary text-black px-4 py-2 rounded-lg">
                        {isPending? "Submitting..." : "Continue"}
                    </button>
                </AlertDialogFooter>
                    </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default PopUpDialogBox
