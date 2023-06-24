import { Prisma } from "@prisma/client";
// import { prisma } from "~/server/database/prisma/client";

// export const prismaScheduleSelect: Required<Parameters<typeof prisma.schedule.findMany>>[0]["select"] = {
export const prismaScheduleSelect: Prisma.ScheduleSelect = {
    day: true,
    period: true,
    forRoom: true,
    forYear: true,
    room: true,
    subject: {
        select: {
            name: true,
            link: true,
            tags: true,
            teachers: {
                select: {
                    name: true
                }
            }
        }
    }
}
