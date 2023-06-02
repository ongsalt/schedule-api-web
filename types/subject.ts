import { z } from "zod"

export const ZSubject = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    teacherIds: z.number().array(),
    scheduleIds: z.number().array(),
})

export type Subject = z.infer<typeof ZSubject>