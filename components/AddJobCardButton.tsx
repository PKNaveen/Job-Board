"use client"
import React, {useActionState,useState} from 'react'
import {Plus, Send, X} from "lucide-react";
import {insertIntoCardTable} from "@/lib/actions/insertActions";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {addJobCardValidation} from "@/lib/validation";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";


export const AddJobCardButton = ({item, onSuccess}:{item:any, onSuccess:any}) => {
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});


    const handleAddJobCard = async (prevState:any, formData:FormData) => {
        try{
            const formValues={
                company:formData.get("company") as string,
                title:formData.get("title") as string,
                url:formData.get("url") as string,
            }
            await addJobCardValidation.parseAsync({
                company_name: formValues.company,
                job_title:formValues.title,
                post_url:formValues.url,
            });
            const insert = await insertIntoCardTable(item.id,formValues.company,formValues.title,formValues.url)
            console.log(formValues.company,formValues.title,formValues.url)
            if(insert?.status === "SUCCESS"){
                                toast.success('Success', {
                    description: 'Job card created successfully',
                })
                setErrors({})
                console.log(errors)
                setOpen(false)
                onSuccess?.();
            }
        }
        catch (e) {
            if (e instanceof z.ZodError) {
                const fieldErrors = e.flatten().fieldErrors;
                const newErrors: Record<string, string> = {};
                console.log(fieldErrors)


                if (fieldErrors.company_name && Array.isArray(fieldErrors.company_name) && fieldErrors.company_name.length > 0) {
                    newErrors.company_name = fieldErrors.company_name[0];

                }if (fieldErrors.job_title && Array.isArray(fieldErrors.job_title) && fieldErrors.job_title.length > 0) {
                    newErrors.job_title = fieldErrors.job_title[0];

                }
                if (fieldErrors.location && Array.isArray(fieldErrors.location) && fieldErrors.location.length > 0) {
                    newErrors.location  = fieldErrors.location[0];

                }
                if (fieldErrors.salary && Array.isArray(fieldErrors.salary) && fieldErrors.salary.length > 0) {
                    newErrors.salary = fieldErrors.salary[0];
                }
                if (fieldErrors.post_url && Array.isArray(fieldErrors.post_url) && fieldErrors.post_url.length > 0) {
                    newErrors.post_url = fieldErrors.post_url[0];
                }
                if (fieldErrors.description && Array.isArray(fieldErrors.description) && fieldErrors.description.length > 0) {
                    newErrors.description = fieldErrors.description[0];

                }
                // Add similar checks for other expected keys
                // if (fieldErrors.email && Array.isArray(fieldErrors.email) && fieldErrors.email.length > 0) {
                //     newErrors.email = fieldErrors.email[0];
                // }

                setErrors(newErrors);

                toast.error('Error',{
                    description:"Please check your inputs and try again",
                })

                return { error: "Validation failed", status: "ERROR" };
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
    const [, formAction, isPending] = useActionState(handleAddJobCard, {
        error: "",
        status: "INITIAL",

    });
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="p-2">
            <Plus color="#ffff"/>
            </DialogTrigger>
            <DialogContent className="bg-dark-test border border-dark-300 [&>button]:text-text-header">
                <DialogHeader>
                    <DialogTitle className="title-text-header">Add Card</DialogTitle>
                    <DialogDescription className="title-text-subheader">Fill the details below</DialogDescription>
                </DialogHeader>
                <form action={formAction}>
                    <div className=" flex flex-col gap-5">

                        <div className="flex flex-col gap-5">
                            <label htmlFor="title" className="blog-form-label">
                                Company
                            </label>
                            <Input
                                id="company"
                                name="company"
                                placeholder="Company"
                                className="text-header-title"
                            />

                            {errors.company_name && <p className="startup-form-error">{errors.company_name}</p>}
                        </div>
                        <div className=" flex flex-col gap-5">
                            <label htmlFor="title" className="blog-form-label">
                                Job Title
                            </label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="title"
                                className="text-header-title"
                            />

                            {errors.job_title && <p className="startup-form-error">{errors.job_title}</p>}
                        </div>
                        <div className=" flex flex-col gap-5">
                            <label htmlFor="title" className="blog-form-label">
                                Post Url
                            </label>
                            <Input
                                id="url"
                                name="url"
                                placeholder="url"
                                className="text-header-title"
                            />

                            {errors.post_url && <p className="startup-form-error">{errors.post_url}</p>}
                        </div>
                    </div >
                    <div className=" flex flex-col py-6 ">
                    <Button type="submit" disabled={isPending} className="bg-dark-300 text-white hover:bg-dark-400 font-semibold ">
                        {isPending ? "Submitting...." : "Submit"}
                        <Send className="size-6 ml-2"/>
                    </Button>
                    </div>
                </form>
               <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <div className="w-full flex flex-col bg-dark-300 text-white hover:bg-dark-400 rounded-lg">
                    <Button  type="button" variant="secondary" className="text-white font-semibold">
                        Close
                        <X className="size-60 ml-2 stroke-2" strokeWidth={100} />
                    </Button>
                    </div>
                </DialogClose>
            </DialogFooter>
            </DialogContent>
        </Dialog>
)
}
