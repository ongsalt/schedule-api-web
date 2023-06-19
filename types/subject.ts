import { z } from "zod"
import { ZTeacher } from "~/types/teacher"

export const ZSubject = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    teacherIds: z.number().array().optional(),
    teacher: ZTeacher,
    scheduleIds: z.number().array().optional(),
})

export type Subject = z.infer<typeof ZSubject>