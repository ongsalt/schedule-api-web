import { z } from "zod";

export const ZCredentials = z.object({
    username: z.string(),
    password: z.string(),
})


export type Credentials = z.infer<typeof ZCredentials>