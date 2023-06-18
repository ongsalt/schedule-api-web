import { User } from "@prisma/client";
import { prisma } from "~/server/database/prisma/client";
import { Session } from "~/types/auth/session";

export async function getUser(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: {
            username
        }
    })
} 

export async function createSession(session: Session) {
    return await prisma.session.create({
        data: {
            authToken: session.authToken,
            userId: session.userId!,
        }
    })
}

export async function getSessionByAuthToken(authToken: string): Promise<Session> {
    const user = await getUserByAuthToken(authToken) as User
    if (!user) throw createError("Internal server error")
    return {
        authToken,
        user
    }
}

export async function getUserByAuthToken(authToken: string) {
    return await prisma.session.findUnique({
        where: {
            authToken: authToken
        }
    }).user()
}

export async function getUserByUsername(username: string) {
    return await prisma.user.findUnique({
        where: {
            username: username
        }
    })
}
