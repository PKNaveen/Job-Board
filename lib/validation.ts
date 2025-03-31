'use client'

import { z } from "zod"

export const signInSchema = z.object({
    email: z.string().email(),

    // TODO
    // Add regex validation here later

    password: z.string().min(8).max(50),
})

export const signUpSchema = z.object({
    firstName: z.string().min(1).max(20),
    LastName: z.string().min(1).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(50),
})
