import { z } from "zod"
import { auth } from "~/server/trpc/middleware/auth"
import { router, publicProcedure } from "~/server/trpc/trpc"
import { ZSubject } from "~/types/subject"
import { ZTest } from "~/types/test"

export const subjectRouter = router({
    new: publicProcedure.use(auth).input(ZSubject).query(({ input }) => {
        return ""
    }),
    list: publicProcedure.query(() => {
        return "Dummy subject"
    })
})
