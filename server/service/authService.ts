import { User } from "@prisma/client"
import { prisma } from "~/server/database/prisma/client"
import { getUser } from "~/server/database/repositories/user"
import { compare, hash } from "bcrypt"
import { Err, Ok, Result } from "~/types/result"

async function login(username: string, password: string): Promise<Result<Partial<User>>> {
    const user: Partial<User> | null = await getUser(username)
    if (!user) {
        return Err("User not found")
    }

    const isPasswordCorrect = await compare(password, user.password!)
    if (!isPasswordCorrect) {
        return Err("Password incorrect")
    }

    delete user.password

    return Ok(user)
}

async function register(username: string, password: string) {
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