import { prisma } from "~/server/database/prisma/client"

import { getRandomSubjects } from "~/utils/mockup"

export async function mockupDatabase(forRoom: number, forYear: number) {
    const data = getRandomSubjects(5, 9)
    console.log(data)

    for (let item of data) {
        await prisma.schedule.create({
            data: {
                day: item.day,
                forRoom: forRoom,
                forYear: forYear,
                period: item.period,
                room: item.room,
                subject: {
                    create: {
                        code: item.subject.code,
                        name: item.subject.name,
                        tags: "",
                        teachers: {
                            create: item.subject.teacher
                        }
                    }
                }
            }
        })
    }
}