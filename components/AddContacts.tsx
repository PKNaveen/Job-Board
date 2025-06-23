"use client"
import React, {useActionState, useState} from 'react'
import {
    Dialog, DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {toast} from "sonner";
import {z} from "zod";
import {useParams, useRouter} from "next/navigation";
import {ContactsForm} from "@/lib/actions/formAction";


const AddContacts = () => {
    const params = useParams();
    const id = params?.id as string | "";
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter()


    const handleAddContacts = async (prevState:any, formData:FormData) => {
        try{
            const insert = await ContactsForm(id, prevState, formData,"insert","")

            if(insert?.status === "SUCCESS"){
                toast.success('Success', {
                    description: 'Contact created successfully',
                })
                router.refresh()
                setErrors({})
                setOpen(false)
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

                if (fieldErrors.company?.length) {
                    newErrors.company = fieldErrors.company[0]; // ✅ not company_name
                }

                if (fieldErrors.title?.length) {
                    newErrors.title = fieldErrors.title[0]; // ✅ not job_title
                }

                if (fieldErrors.email?.length) {
                    newErrors.email = fieldErrors.email[0];
                }

                if (fieldErrors.number?.length) {
                    newErrors.number = fieldErrors.number[0];
                }

                if (fieldErrors.linkedin?.length) {
                    newErrors.linkedin = fieldErrors.linkedin[0];
                }

                if (fieldErrors.twitter?.length) {
                    newErrors.twitter = fieldErrors.twitter[0];
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
    const [, formAction, isPending] = useActionState(handleAddContacts, {
        error: "",
        status: "INITIAL",

    });
    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <div
            className="rounded-xl bg-text-main shadow-md border-dark-275 border border-solid outline-none drop-shadow-md px-2 py-2 hover:bg-white">
            <p className="text-black font-bold">Add contacts</p>
        </div>
        </DialogTrigger>
            <DialogContent className="bg-dark-test border border-dark-300 [&>button]:text-text-header max-w-7xl">
                <DialogHeader>
                    <DialogTitle className="title-text-header">Add Card</DialogTitle>
                    <DialogDescription className="title-text-subheader">Fill the details below</DialogDescription>
                </DialogHeader>
                <form action={formAction}>
                    <div className=" grid grid-cols-4 w-full gap-10">

                        <div className="flex flex-col gap-5">
                            <label htmlFor="title" className="blog-form-label">
                                Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Name"
                                className="text-header-title"
                            />
                            {errors.name && <p className="startup-form-error">{errors.name}</p>}
                        </div>
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

                            {errors.company && <p className="startup-form-error">{errors.company}</p>}
                        </div>
                        <div className=" flex flex-col gap-5">
                            <label htmlFor="title" className="blog-form-label">
                                Job Title
                            </label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Title"
                                className="text-header-title"
                            />

                            {errors.title && <p className="startup-form-error">{errors.title}</p>}
                        </div>
                        <div className=" flex flex-col gap-5">
                            <label htmlFor="title" className="blog-form-label">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Email"
                                className="text-header-title"
                            />

                            {errors.email && <p className="startup-form-error">{errors.email}</p>}
                        </div>
                        <div className=" flex flex-col gap-5">
                            <label htmlFor="title" className="blog-form-label">
                                Phone number
                            </label>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder="Phone number"
                                className="text-header-title"
                            />

                            {errors.phone && <p className="startup-form-error">{errors.phone}</p>}
                        </div>
                        <div className=" flex flex-col gap-5">
                            <label htmlFor="title" className="blog-form-label">
                                LinkedIn
                            </label>
                            <Input
                                id="linkedin"
                                name="linkedin"
                                placeholder="LinkedIn"
                                className="text-header-title"
                            />

                            {errors.linkedin && <p className="startup-form-error">{errors.linkedin}</p>}
                        </div>
                        <div className=" flex flex-col gap-5">
                            <label htmlFor="title" className="blog-form-label">
                                Twitter
                            </label>
                            <Input
                                id="twitter"
                                name="twitter"
                                placeholder="Twitter"
                                className="text-header-title"
                            />

                            {errors.twitter && <p className="startup-form-error">{errors.twitter}</p>}
                        </div>
                    </div >
                    <div className=" flex flex-col py-8 w-1/3 mx-auto ">
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
export default AddContacts
