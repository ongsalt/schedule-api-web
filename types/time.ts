import { z } from "zod";

export const ZTime = z.object({
    hour: z.number(),
    minute: z.number()
})

export type Time = z.infer<typeof ZTime>