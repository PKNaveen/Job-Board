'use client'

import { z } from "zod";

export const boardNameSchema = z.object({
    name: z.string().min(3).max(30)
})

export const jobCardValidationSchema = z.object({
    company_name: z.string().min(3,{message:"Enter minimum 3 characters"}).max(15,{message:"Please enter less than 15 characters"}),
    job_title: z.string().min(3,{message:"Enter minimum 3 characters"}).max(30,{message:"Please enter less than 30 characters"}),
    salary: z.string().min(3,{message:"Enter minimum 3 characters"}).max(30,{message:"Please enter less than 30 characters"}),
    location: z.string().min(3,{message:"Enter minimum 3 characters"}).max(30,{message:"Please enter less than 30 characters"}),
    post_url: z.string().min(3,{message:"Enter minimum 3 characters"}).max(100,{message:"Please enter less than 100 characters"}),
    description: z.string().min(3,{message:"Enter minimum 3 characters"}).max(200,{message:"Please enter less than 200 characters"})

})

export const addJobCardValidation = z.object({
    company_name: z.string().min(3,{message:"Enter minimum 3 characters"}).max(15,{message:"Please enter less than 15 characters"}),
    job_title: z.string().min(3,{message:"Enter minimum 3 characters"}).max(30,{message:"Please enter less than 30 characters"}),
    post_url: z.string().min(3,{message:"Enter minimum 3 characters"}).max(100,{message:"Please enter less than 100 characters"}),

})

export const addContactsValidation = z.object({
    name:z.string().min(3,{message:"Enter minimum 3 characters"}).max(30,{message:"Please enter less than 30 characters"}),
    company:z.string().min(3,{message:"Enter minimum 3 characters"}).max(15,{message:"Please enter less than 15 characters"}),
    title: z.string().min(3,{message:"Enter minimum 3 characters"}).max(30,{message:"Please enter less than 30 characters"}),
    email: z.string().email({message:"Enter an Email Id"}),
    number:z.string().max(13,{message:"Please enter Phone number with "+" and Postal code Eg: +1 for USA"}),
    linkedin:z.string().url({message:"Enter valid LinkedIn URL"}),
    twitter:z.string().url({message:"Enter valid Twitter URL"}),
})

export const renameListValidation = z.object({
    name:z.string().min(3,{message:"Enter minimum 3 characters"}).max(15,{message:"Please enter less than 15 characters"}),
})
