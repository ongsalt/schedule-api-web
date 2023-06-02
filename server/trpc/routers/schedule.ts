import { z } from "zod"
import { auth } from "~/server/trpc/middleware/auth"
import { router, publicProcedure } from "~/server/trpc/trpc"
import { ZTest } from "~/types/test"

export const scheduleRouter = router({
    new: publicProcedure.use(auth).input(ZTest).query(({ input }) => {
        return `Hello ${input.name} at ${input.period}`
    }),
    get: publicProcedure.query(() => {
        return "Dummy schedule"
    })
})
