import { z } from "zod"
import { ZSubject } from "~/types/subject"

export const ZSchedule = z.object({
    id: z.number(),
    forYear: z.number(),
    forRoom: z.number(),
    subjectId: z.number(),
    subject: ZSubject,
    period: z.number(),
    day: z.number(),
    room: z.string()
})

export const ZScheduleFilter = z.object({
    forYear: z.number().optional(),
    forRoom: z.number().optional(),
    subjectName: z.string().optional(),
    subjectCode: z.string().optional(),
    teacherName: z.string().optional(),
    period: z.number().optional(),
    day: z.number().optional(),
    room: z.string().optional()
})

export type Schedule = z.infer<typeof ZSchedule>
export type ScheduleFilter = z.infer<typeof ZScheduleFilter>