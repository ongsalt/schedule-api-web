import { number, z } from "zod";
import { prisma } from "~/server/database/prisma/client";
import { Subject, ZSubjectUpdate } from "~/types/subject";

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

export async function listSubjectForAutocomplete(query: string) {
    return await prisma.subject.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: query
                    }
                },
                {
                    teachers: {
                        some: {
                            name: {
                                contains :query
                            }
                        }
                    }
                }
            ]
        },
        select: {
            id: true,
            name: true,
            code: true,
            teachers: {
                select: {
                    name: true,
                    id: true
                }
            }
        },
        take: 7,
    })
}

export async function createSubject(name: string, code?: string, teacherIds?: number[], tags?: string, link?: string) {
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

export async function updateSubject(data: z.infer<typeof ZSubjectUpdate>) {
    return await prisma.subject.update({
        where: {
            id: data.id
        },
        data: {
            code: data.code,
            link: data.link,
            name: data.name,
            tags: data.tags,
            teachers: data.teacherIds === undefined ? undefined : {
                connect: data.teacherIds.map(id => ({ id }))
            }
        }
    })
}