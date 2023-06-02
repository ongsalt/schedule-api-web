import { z } from "zod"

export const ZSchedule = z.object({
    id: z.number(),
    classId: z.number(),
    subjectId: z.number(),
})

export type Schedule = z.infer<typeof ZSchedule>