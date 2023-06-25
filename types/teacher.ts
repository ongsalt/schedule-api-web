import { z } from "zod"

export const ZTeacher = z.object({
    id: z.number(),
    name: z.string(),
    subjectIds: z.number().array().optional()
})

export const ZTeacherCreate = z.object({
    name: z.string(),
})


export type Teacher = z.infer<typeof ZTeacher>