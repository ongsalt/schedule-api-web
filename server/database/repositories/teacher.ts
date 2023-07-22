import { prisma } from "~/server/database/prisma/client";

export async function createNewTeacher(name: string) {
    return await prisma.teacher.create({
        data: {
            name
        }
    })
}

export async function listTeacher() {
    return await prisma.teacher.findMany({
        select: {
            name: true,
            id: true,
        }
    })
}

export async function listTeacherForAutocomplete(query: string) {
    return (await prisma.teacher.findMany({
        select: {
            name: true,
            id: true
        },
        where: {
            name: {
                contains: query
            }
        },
        take: 7
    }))
}

export async function renameTeacher(id: number, name: string) {
    return await prisma.teacher.update({
        where: {
            id
        },
        data: {
            name
        }
    })
}

export async function deleteTeacher(id: number) {
    return await prisma.teacher.delete({
        where: {
            id
        }
    })
}