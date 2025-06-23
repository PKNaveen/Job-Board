"use client"
import React, {useActionState, useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Linkedin, Mail, Phone, Send, Twitter} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {ContactsForm} from "@/lib/actions/formAction";
import {toast} from "sonner";
import {z} from "zod";
import {deleteContactCard} from "@/lib/actions/deleteActions";

type ContactCardProps = {
    id:string;
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    twitter: string;
    company: string;
    title: string;
};

const ContactCard = ({
                         id,
                         name,
                         email,
                         phone,
                         linkedin,
                         twitter,
                         company,
                         title,
                     }: ContactCardProps) => {
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter()

    const handleUpdateContacts = async (prevState:any, formData:FormData) =>{
        try{
            const update = await ContactsForm(id, prevState,formData,"update",id)
            if(update?.status === "SUCCESS"){
                toast.success('Success', {
                    description: 'Contact updated successfully',
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
    const handleDelete = async () =>{
        const action =   await deleteContactCard(id)
        console.log(action?.status)
        if (action?.status==="SUCCESS") {
            toast.success("Contact successfully deleted!");
        }

        router.refresh()
    }

    const [, formAction, isPending] = useActionState(handleUpdateContacts, {
        error: "",
        status: "INITIAL",

    });
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div
                    className="mx-28 px-4 bg-dark-test p-2 rounded-xl shadow text-sm border-dark-275 border border-solid outline-none cursor-pointer w-[250px] h-full">

                    <div className="flex-col flex items-start px-2 pb-2 gap-2">


                        <div className="flex-between w-full">
                            <p className="font-extrabold text-[#DFDFDF]">{name}</p>
                        </div>
                        <div className="flex-between gap-4">
                            <h4 className="font-light text-[#DFDFDF]">{company}</h4>
                        </div>
                        <div className="w-full h-px bg-gray-500 my-2"/>
                        <div className="flex-between w-full py-2">
                            <div className="flex-col flex items-start gap-2 ">
                                <div className="flex flex-row gap-2">
                                    <Mail color="#ffffff" className="size-4"/>
                                    <h4 className="font-light text-[#DFDFDF]">{email}</h4>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Phone color="#ffffff" className="size-4"/>
                                    <h4 className="font-light text-[#DFDFDF]">{phone}</h4>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Linkedin color="#ffffff" className="size-4"/>
                                    <h4 className="font-light text-[#DFDFDF]">{linkedin}</h4>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Twitter color="#ffffff" className="size-4"/>
                                    <h4 className="font-light text-[#DFDFDF]">{twitter}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                defaultValue={name}
                                className="text-header-title-default"
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
                                defaultValue={company}
                                className="text-header-title-default"
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
                                defaultValue={title}
                                className="text-header-title-default"
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
                                defaultValue={email}
                                className="text-header-title-default"
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
                                defaultValue={phone}
                                className="text-header-title-default"
                            />

                            {errors.number && <p className="startup-form-error">{errors.number}</p>}
                        </div>
                        <div className=" flex flex-col gap-5">
                            <label htmlFor="title" className="blog-form-label">
                                LinkedIn
                            </label>
                            <Input
                                id="linkedin"
                                name="linkedin"
                                defaultValue={linkedin}
                                className="text-header-title-default"
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
                                defaultValue={twitter}
                                className="text-header-title-default"
                            />

                            {errors.twitter && <p className="startup-form-error">{errors.twitter}</p>}
                        </div>
                    </div>
                    <div className=" flex flex-col py-6 ">
                        <Button type="submit" className="bg-dark-300 text-white hover:bg-dark-400 font-semibold ">
                            {isPending ? "Submitting...." : "Submit"}
                            <Send className="size-6 ml-2"/>
                        </Button>
                    </div>
                </form>
                <button onClick={handleDelete}
                        className="bg-dark-300 text-white hover:bg-dark-400 font-semibold my-4 py-2 rounded-md ">
                    delete
                </button>
                {/*<ContactCardContent id={id} name={name} email={email} phone={phone} linkedin={linkedin} twitter={twitter} company={company} title={title}/>*/}
            </DialogContent>
        </Dialog>
    )
}
export default ContactCard
