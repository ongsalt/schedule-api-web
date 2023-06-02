import { z } from "zod"

export const ZTeacher = z.object({
    id: z.number(),
    name: z.string(),
    subjectIds: z.number().array()
})

export type Teacher = z.infer<typeof ZTeacher>