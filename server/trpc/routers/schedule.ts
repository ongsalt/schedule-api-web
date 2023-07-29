import { z } from "zod"
import { prisma } from "~/server/database/prisma/client"
import { addSchedule, deleteSchedule, getSchedulesByFilter, updateSchedule } from "~/server/database/repositories/schedule"
import { getCurrentPeriod, getRecommendation } from "~/server/service/schedule"
import { auth } from "~/server/trpc/middleware/auth"
import { router, publicProcedure } from "~/server/trpc/trpc"
import { prismaScheduleSelect } from "~/server/utils/transform"
import { ZScheduleCreate, ZScheduleFilter, ZScheduleUpdate } from "~/types/schedule"
import { ZTest } from "~/types/test"

export const scheduleRouter = router({
    new: publicProcedure.use(auth).input(ZScheduleCreate).mutation(async ({ input }) => {
        return await addSchedule(input)
    }),
    update: publicProcedure.use(auth).input(ZScheduleUpdate).mutation(async ({ input }) => {
        console.log(input)
        return await updateSchedule(input)
    }),
    delete: publicProcedure.use(auth).input(z.object({
        forYear: z.number(),
        forRoom: z.number(),
        day: z.number(),
        period: z.number(),
    })).mutation(async ({ input }) => {
        return await deleteSchedule(input.forYear, input.forRoom, input.day, input.period)
    }),
    list: publicProcedure.input(z.number().default(0)).query(async ({ input }) => {
        return await getSchedulesByFilter({
            take: 20,
            start: input
        })
    }),
    search: publicProcedure.input(ZScheduleFilter).query(async ({ input }) => {
        // console.log(input)
        return await getSchedulesByFilter(input)
    }),
    table: publicProcedure.input(z.object({
        forYear: z.number(),
        forClass: z.number(),
    })).query(async ({ input }) => {
        // console.log(input)
        return await getSchedulesByFilter({
            take: 10 * 7,
            start: 0,
            forRoom: input.forClass,
            forYear: input.forYear,
        })
    }),
    getRecommend: publicProcedure.input(z.object({
        forYear: z.number(),
        forClass: z.number(),
    })).query(async ({ input }) => {
        // return []

        return await getRecommendation(input.forYear, input.forClass)
    }),
    getCurrentPeriod: publicProcedure.query(() => {
        return getCurrentPeriod()
    })
})
