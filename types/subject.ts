import { z } from "zod"
import { ZTeacher } from "~/types/teacher"

export const ZSubject = z.object({
    id: z.number().optional(),
    name: z.string(),
    code: z.string(),
    teacherIds: z.number().array().optional(),
    teacher: ZTeacher.array(),
    link: z.string(),
    tags: z.string(),
    scheduleIds: z.number().array().optional(),
})

export const ZSubjectCreate = z.object({
    name: z.string(),
    code: z.string(),
    teacherIds: z.number().array().optional(),
})

export type Subject = z.infer<typeof ZSubject>