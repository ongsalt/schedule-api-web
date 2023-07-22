import { number } from "zod";
import { prisma } from "~/server/database/prisma/client";

export async function listSubject() {
    return await prisma.subject.findMany({
        select: {
            id: true,
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
    })
}

export async function createSubject(name: string, code: string, teacherIds?: number[], tags?: string, link?: string) {
    return await prisma.subject.create({
        data: {
            name: name,
            code: code,
            tags: tags ?? '',
            link: link,
            teachers: {
                connect: teacherIds?.map(it => ({ id: it }))
            }
        }
    })
}

export async function deleteSubject(id: number) {
    return await prisma.subject.delete({
        where: {
            id: id
        }
    })
}