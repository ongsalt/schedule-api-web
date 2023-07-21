import { z } from "zod"
import { prisma } from "~/server/database/prisma/client"
import { createNewTeacher, deleteTeacher, listTeacher, listTeacherForAutocomplete, renameTeacher } from "~/server/database/repositories/teacher"
import { auth } from "~/server/trpc/middleware/auth"
import { router, publicProcedure } from "~/server/trpc/trpc"
import { ZTeacher, ZTeacherCreate } from "~/types/teacher"

export const taecherRouter = router({
    new: publicProcedure.use(auth).input(ZTeacherCreate).mutation(async ({ input }) => {
        return await createNewTeacher(input.name)
    }),
    list: publicProcedure.query(async () => {
        return await listTeacher()
    }),
    listForAutocomplete: publicProcedure.query(async () => {
        return await listTeacherForAutocomplete()
    }),
    rename: publicProcedure.input(z.object({
        id: z.number(),
        name: z.string()
    })).mutation(async ({ input }) => {
        return await renameTeacher(input.id, input.name)
    }),
    delete: publicProcedure.input(z.object({
        id: z.number()
    })).mutation(async ({ input }) => {
        return await deleteTeacher(input.id)
    })
})
