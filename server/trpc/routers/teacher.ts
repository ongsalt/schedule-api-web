import { z } from "zod"
import { prisma } from "~/server/database/prisma/client"
import { auth } from "~/server/trpc/middleware/auth"
import { router, publicProcedure } from "~/server/trpc/trpc"
import { ZTeacher, ZTeacherCreate } from "~/types/teacher"
import { ZTest } from "~/types/test"

export const taecherRouter = router({
    new: publicProcedure.use(auth).input(ZTeacherCreate).query(async ({ input }) => {
        return await prisma.teacher.create({
            data: input
        })
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
