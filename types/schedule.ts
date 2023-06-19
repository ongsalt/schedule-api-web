import { z } from "zod"
import { ZSubject } from "~/types/subject"

export const ZSchedule = z.object({
    id: z.number(),
    classId: z.number(),
    subjectId: z.number(),
    subject: ZSubject,
    period: z.number(),
    day: z.number()
})

export type Schedule = z.infer<typeof ZSchedule>