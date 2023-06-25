import { z } from "zod"
import { prisma } from "~/server/database/prisma/client"
import { auth } from "~/server/trpc/middleware/auth"
import { router, publicProcedure } from "~/server/trpc/trpc"
import { ZSubject, ZSubjectCreate } from "~/types/subject"

export const subjectRouter = router({
    new: publicProcedure.use(auth).input(ZSubjectCreate).query(async ({ input }) => {
        return await prisma.teacher.create({
            data: input,
        })
    }),
    list: publicProcedure.query(async () => {
        return await prisma.teacher.findMany({
            select: {
                id: true,
                name: true
            }
        })
    })
})
