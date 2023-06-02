import { z } from "zod"

export const ZSubject = z.object({
    id: z.number(),
    prefix: z.string(),
    year: z.number(),
    room: z.number(),
    scheduleIds: z.number().array(),
})

export type Subject = z.infer<typeof ZSubject>