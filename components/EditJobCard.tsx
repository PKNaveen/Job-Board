"use client"
import React, {useActionState, useState} from 'react'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {jobCardValidationSchema} from "@/lib/validation";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {updateJobCard} from "@/lib/actions/updateActions";
import {toast} from "sonner";
import {deleteJobCard} from "@/lib/actions/deleteActions";

export const EditJobCard = ({column}:{column:any}) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter();
    console.log(column.id)

    const handleDeleteJobCard = async ()=>{
        try {
            const del = await deleteJobCard(column.id);
            if (del?.status === "SUCCESS"){
                toast.success('Success', {
                    description: 'Job Application delete successfully',
                })


                router.refresh()
            }
        }
        catch (e) {
            toast.error('Error',{
                description:"An unexpected error has occurred",
            })
        }
    }
   const handleFormSubmit = async (prevState:any, formData:FormData)=>{
        try {
            const formValues={
                company:formData.get("company") as string,
                title:formData.get("title") as string,
                salary:formData.get("salary") as string,
                location:formData.get("location") as string,
                url:formData.get("url") as string,
                description:formData.get("description") as string,
            }
            // Improved Zod error detection only on name instead of all values such as uuid
             await jobCardValidationSchema.parseAsync({
                 company_name: formValues.company,
                 job_title:formValues.title,
                 salary:formValues.salary,
                 location:formValues.location,
                 post_url:formValues.url,
                 description:formValues.description,
             });
            console.log(formValues.company,formValues.title,formValues.url,formValues.salary,formValues.location,formValues.description,column.id)
            const result = await updateJobCard(formValues.company,formValues.title,formValues.url,formValues.salary,formValues.location,formValues.description,column.id);

            if(result.status=="SUCCESS"){

                router.refresh();
                toast.success('Success', {
                    description: 'Job card updated successfully',
                })
                setErrors({})
            }

        }

            // Check for Zod error
            /*
            Expected Error:

            ZodError: [
              {
                "salary": [
                    "Enter minimum 3 characters"
                ],
                "location": [
                    "Enter minimum 3 characters"
                ],
                "post_url": [
                    "Enter minimum 3 characters"
                ],
                "description": [
                    "Enter minimum 3 characters"
                ]
              }

            */

        catch (error) {

            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
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
    };

    const [, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",

    });
    return (
        <>
        <form action={formAction}>
            <div className="flex flex-row flex-wrap w-full mb-5 gap-4 px-2">


                <div className="w-1/3 flex-1">
                    <div className="flex flex-col gap-4">
                    <label htmlFor="title" className="blog-form-label ">
                        Company
                    </label>
                    <Input
                        id="company"
                        name="company"
                        defaultValue={column.card_name}
                        className="text-header-title"
                    />

                    {errors.company_name && <p className="startup-form-error">{errors.company_name}</p>}
                    </div>
                </div>


                <div className="w-1/3">
                    <div className="flex flex-col gap-4">
                    <label htmlFor="Job Title" className="blog-form-label">
                        Job Title
                    </label>
                    <Input
                        id="title"
                        name="title"
                        className="text-header-title"
                        defaultValue={column.description}/>

                    {errors.job_title && <p className="startup-form-error">{errors.job_title}</p>}
                    </div>
                </div>

                <div className="w-1/3">
                    <div className="flex flex-col gap-4">

                    <label htmlFor="link" className="blog-form-label">
                        Salary
                    </label>

                    <Input
                        id="salary"
                        name="salary"
                        className="text-header-title"
                        placeholder={column.salary}/>

                    {errors.salary && <p className="startup-form-error">{errors.salary}</p>}
                    </div>
                </div>

                <div className="w-1/3">
                    <div className="flex flex-col gap-4">

                    <label htmlFor="link" className="blog-form-label">
                        Location
                    </label>
                    <Input
                        id="location"
                        name="location"
                        className="text-header-title"
                        placeholder="location"/>

                    {errors.location && <p className="startup-form-error">{errors.location}</p>}
                    </div>
                </div>

                <div className="w-1/3">
                    <div className="flex flex-col gap-4">
                    <label htmlFor="link" className="blog-form-label">
                        Post Url
                    </label>
                    <Input
                        id="url"
                        name="url"
                        className="text-header-title"
                        defaultValue={column.post_url}/>

                    {errors.post_url && <p className="startup-form-error">{errors.post_url}</p>}
                    </div>
                </div>

            </div>
            <div className="flex flex-col py-4 px-2 gap-4 ">
            <label htmlFor="link" className="blog-form-label">
                    Description
                </label>
                <Textarea
                    id="description"
                    name="description"
                    className="text-header-title"
                    placeholder="description"/>

                {errors.description && <p className="startup-form-error">{errors.description}</p>}
            </div>
            <div className="px-2 py-2">
            <Button type="submit" disabled={isPending} className="bg-dark-300 text-white hover:bg-dark-400 font-semibolds px-10">
                {isPending ? "Submitting...." : "Submit"}
                <Send className="size-6 ml-2"/>
            </Button>
            </div>

        </form>
            <div className="px-2 py-2">
                <button onClick={handleDeleteJobCard} className="bg-dark-300 text-white hover:bg-dark-400 font-semibolds px-10 rounded-md py-1">
                    Delete
                </button>
            </div>
        </>
    )
}
