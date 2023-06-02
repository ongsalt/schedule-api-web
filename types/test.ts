import { z } from "zod"

export const ZTest = z.object({
    name: z.string(),
    period: z.number()
})

export type Test = z.infer<typeof ZTest>