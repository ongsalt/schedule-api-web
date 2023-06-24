import { z } from "zod"
import { prisma } from "~/server/database/prisma/client"
import { auth } from "~/server/trpc/middleware/auth"
import { router, publicProcedure } from "~/server/trpc/trpc"
import { ZTest } from "~/types/test"

export const taecherRouter = router({
    new: publicProcedure.use(auth).input(ZTest).query(({ input }) => {
        return `Hello ${input.name} at ${input.period}`
    }),
    list: publicProcedure.query(async () => {
        return await prisma.teacher.findMany({
            select: {
                name: true,
                id: true,
            }
        })
    })
})
