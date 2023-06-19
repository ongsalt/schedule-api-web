import { z } from "zod"

export const ZClass = z.object({
    id: z.number(),
    prefix: z.string(),
    year: z.number(),
    room: z.number(),
    scheduleIds: z.number().array(),
})

export type Class = z.infer<typeof ZClass>