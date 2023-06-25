import { z } from "zod"
import format from "~/server/service/ocr"
import { auth } from "~/server/trpc/middleware/auth"
import { router, publicProcedure } from "~/server/trpc/trpc"

export const ocrRouter = router({
    read: publicProcedure.use(auth).query(({ input }) => {
        return ""
    }),
    format: publicProcedure.input(z.string()).query(({ input }) => {
        return format(input)
    }) 
})
