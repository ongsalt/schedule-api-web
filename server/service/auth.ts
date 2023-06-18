import { User } from "@prisma/client"
import { prisma } from "~/server/database/prisma/client"
import { createSession, getUser } from "~/server/database/repositories/user"
import { compare, hash } from "bcrypt"
import { Err, Ok, Result } from "~/types/result"

import { H3Event } from "h3"
import { Session } from "~/types/auth/session"

export async function generateSession(user: Partial<User>, event: H3Event): Promise<Result<Session>> {
    const authToken = crypto.randomUUID().replaceAll('-', '')
    const session = await createSession({ authToken, userId: user.id! })

    const userId = session.userId

    if (!userId) {
        return Err("Error creating session")
    }

    setCookie(event, "auth_token", authToken, { path: '/', httpOnly: true })
    return Ok(session)
}

export async function register(username: string, password: string) {
    const encryptedPassword = await hash(password, 12)
    return Ok(
        await prisma.user.create({
            data: {
                username,
                password: encryptedPassword,
            }
        })
    )
}