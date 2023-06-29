import { z } from "zod"
import { ZPeriodLocation } from "~/types/period"
import { ZSubject } from "~/types/subject"

export const ZSchedule = z.object({
    id: z.number().optional(),
    forYear: z.number(),
    forRoom: z.number(),
    room: z.string().optional().nullable(),
    subject: ZSubject,
    subjectId: z.number().optional(),
    period: z.number(),
    day: z.number(),
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
    room: z.string().optional(),
    // For pagination
    start: z.number().default(0),
    take: z.number().default(20)
})

export const ZScheduleRecommendation = z.object({
    subjectName: z.string(),
    subjectCode: z.string(),
    teacherName: z.string(),
    location: ZPeriodLocation,
    period: z.number(),
    link: z.string().optional(),
    room: z.string().optional(),
})

export type Schedule = z.infer<typeof ZSchedule>
export type ScheduleFilter = z.infer<typeof ZScheduleFilter>
export type ScheduleCreate = z.infer<typeof ZScheduleCreate>
export type ScheduleRecommendation = z.infer<typeof ZScheduleRecommendation>