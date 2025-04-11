'use client'

import { z } from "zod"

export const boardNameSchema = z.object({
    name: z.string().min(3).max(30)
})
