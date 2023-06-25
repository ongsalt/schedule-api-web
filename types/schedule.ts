import { z } from "zod"
import { PeriodLocation } from "~/types/period"
import { ZSubject } from "~/types/subject"

export const ZSchedule = z.object({
    id: z.number().optional(),
    forYear: z.number(),
    forRoom: z.number(),
    subjectId: z.number().optional(),
    subject: ZSubject,
    period: z.number(),
    day: z.number(),
    room: z.string().optional()
})

export const ZScheduleCreate = z.object({
    forYear: z.number(),
    forRoom: z.number(),
    subjectId: z.number(),
    period: z.number(),
    day: z.number(),
    room: z.string().optional()
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

export const ZScheduleRecommendation = z.object({
    subjectName: z.string(),
    subjectCode: z.string(),
    teacherName: z.string(),
    location: z.nativeEnum(PeriodLocation),
    period: z.number(),
    room: z.string().optional(),
})

export type Schedule = z.infer<typeof ZSchedule>
export type ScheduleFilter = z.infer<typeof ZScheduleFilter>
export type ScheduleCreate = z.infer<typeof ZScheduleCreate>
export type ScheduleRecommendation = z.infer<typeof ZScheduleRecommendation>