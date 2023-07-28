import { Prisma } from "@prisma/client";
import { number, z } from "zod";
import { prisma } from "~/server/database/prisma/client";
import { ScheduleFilter, ZScheduleCreate, ZScheduleUpdate } from "~/types/schedule";

export async function getSchedulesByFilter(input: ScheduleFilter) {
    const query: any = {}

    if (input.forYear) query.forYear = input.forYear
    if (input.forRoom) query.forRoom = input.forRoom
    if (input.period) query.period = input.period
    if (input.day || input.day === 0) query.day = input.day
    if (input.room) {
        query.room = {
            contains: input.room
        }
    }

    if (input.subjectCode || input.subjectName || input.teacherName) {
        query.subject = {}
        if (input.subjectCode) query.subject.code = input.subjectCode
        if (input.subjectName) query.subject.name = input.subjectName

        if (input.teacherName) query.subject.teacher = input.subjectCode
    }
    return await prisma.schedule.findMany({
        where: query,
        select: {
            day: true,
            period: true,
            forRoom: true,
            forYear: true,
            room: true,
            subject: {
                select: {
                    name: true,
                    code: true,
                    link: true,
                    tags: true,
                    teachers: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                }
            }
        },
        take: input.take,
        skip: input.start
    })
}

export async function getSchedulesByDaySince(forYear: number, forClass: number, day: number, period: number) {
    const query: any = {}

    return await prisma.schedule.findMany({
        where: {
            forYear: forYear,
            forRoom: forClass,
            day: day,
            period: {
                gte: period
            }
        },
        select: {
            day: true,
            period: true,
            forRoom: true,
            forYear: true,
            room: true,
            subject: {
                select: {
                    name: true,
                    code: true,
                    link: true,
                    teachers: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
}

export async function getSchedule(forYear: number, forClass: number, day: number, period: number) {
    return await prisma.schedule.findFirstOrThrow({
        where: {
            forYear: forYear,
            forRoom: forClass,
            day: day,
            period: {
                gte: period
            }
        },
        select: {
            day: true,
            period: true,
            forRoom: true,
            forYear: true,
            room: true,
            subject: {
                select: {
                    name: true,
                    code: true,
                    link: true,
                    teachers: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
}

export async function deleteSchedule(forYear: number, forRoom: number, day: number, period: number) {
    return await prisma.schedule.delete({
        where: {
            forYear_forRoom_day_period: {
                forRoom,
                forYear,
                day,
                period,
            }
        }
    })
}

export async function addSchedule(data: z.infer<typeof ZScheduleCreate>) {
    return await prisma.schedule.create({
        data: data
    })
}

export async function updateSchedule(data: z.infer<typeof ZScheduleUpdate>) {
    return await prisma.schedule.update({
        where: {
            forYear_forRoom_day_period: {
                forRoom: data.target.forRoom,
                forYear: data.target.forYear,
                day: data.target.day,
                period: data.target.period,
            }
        },
        data: {
            forRoom: data.forRoom,
            forYear: data.forYear,
            day: data.day,
            period: data.period,
            room: data.room,
            subjectId: data.subjectId
        }
    })
}
