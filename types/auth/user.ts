import { z } from "zod"


export const ZUser = z.object({
    id: z.number(),
    username: z.string(),
    name: z.string().nullable(),
    password: z.string(),
    role: z.number()
})

export type User = z.infer<typeof ZUser>
