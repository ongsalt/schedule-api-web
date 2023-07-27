import { z } from "zod"
import { ZTeacher } from "~/types/teacher"

export const ZSubject = z.object({
    id: z.number().optional(),
    name: z.string(),
    code: z.string().optional().nullable(),
    teacherIds: z.number().array().optional(),
    teachers: ZTeacher.array(),
    link: z.string().nullable().optional(),
    tags: z.string().nullable().optional(),
    scheduleIds: z.number().array().optional(),
})

export const ZSubjectCreate = z.object({
    name: z.string(),
    code: z.string().optional(),
    link: z.string().optional(),
    tags: z.string().optional(),
    teacherIds: z.number().array().optional(),
})

export const ZSubjectUpdate = z.object({
    id: z.number(),
    name: z.string().optional(),
    code: z.string().optional(),
    link: z.string().optional(),
    tags: z.string().optional(),
    teacherIds: z.number().array().optional(),
})


export type Subject = z.infer<typeof ZSubject>