import { z } from "zod"
import { prisma } from "~/server/database/prisma/client"
import { createSubject, listSubject, deleteSubject, updateSubject, listSubjectForAutocomplete } from "~/server/database/repositories/subject"
import { auth } from "~/server/trpc/middleware/auth"
import { router, publicProcedure } from "~/server/trpc/trpc"
import { ZSubject, ZSubjectCreate, ZSubjectUpdate } from "~/types/subject"

// Todo 
// implement update method

export const subjectRouter = router({
    new: publicProcedure.use(auth).input(ZSubjectCreate).mutation(async ({ input }) => {
        return await createSubject(input.name, input.code, input.teacherIds, input.tags, input.link)
    }),
    delete: publicProcedure.use(auth).input(z.object({
        id: z.number()
    })).mutation(async ({ input }) => {
        return await deleteSubject(input.id)
    }),
    list: publicProcedure.query(async () => {
        return await listSubject()
    }),
    listForAutocomplete: publicProcedure.input(z.string()).query(async ({ input }) => {
        return await listSubjectForAutocomplete(input)
    }),
    update: publicProcedure.use(auth).input(ZSubjectUpdate).mutation(async ({ input }) => {
        return await updateSubject(input)
    })
})
