import { z } from "zod"
import { prisma } from "~/server/database/prisma/client"
import { auth } from "~/server/trpc/middleware/auth"
import { router, publicProcedure } from "~/server/trpc/trpc"
import { prismaScheduleSelect } from "~/server/utils/transform"
import { ZScheduleCreate, ZScheduleFilter } from "~/types/schedule"
import { ZTest } from "~/types/test"

export const scheduleRouter = router({
    new: publicProcedure.use(auth).input(ZScheduleCreate).query(async ({ input }) => {
        return await prisma.schedule.create({
            data: input
        })
    }),
    list: publicProcedure.query(async () => {
        return await prisma.schedule.findMany()
    }),
    search: publicProcedure.input(ZScheduleFilter).query(async  ({ input }) => {
        const res = await prisma.schedule.findMany({
            where: {
                forYear: input.forYear,
                forRoom: input.forRoom,
                period: input.period,
                day: input.day,
                room: {
                    contains: input.room
                },
                subject: {
                    name: {
                        contains: input.subjectName
                    },
                    code: {
                        contains: input.subjectCode
                    },
                    teachers: {
                        some: {
                            name: input.teacherName
                        }
                    }
                }       
            },
            select: prismaScheduleSelect
        })


        return res
    })
})
