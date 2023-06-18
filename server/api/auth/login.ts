import { getUserByUsername } from "~~/server/database/repositories/user"
import { compare } from "bcrypt"
import { generateSession } from "~~/server/service/auth"
import { LoginResult } from "~~/types/auth/loginResult"

export default defineEventHandler(async event => {
    const body = await readBody(event)

    const { username, password } = body

    if (!username || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: "Field(s) missing!",
            data: {
                isOk: false,
                error: {
                    missingField: true
                }
            } as LoginResult
        })
    }

    // get user by username
    const user = await getUserByUsername(username)
    if (!user) {
        throw createError({
            statusCode: 403,
            statusMessage: "Invalid credential",
            data: {
                isOk: false,
                error: {
                    wrongUsernameOrPassword: true
                }
            } as LoginResult
        })
    }

    // compare password
    const isOk = await compare(password, user.password);

    if (!isOk) {   
        throw createError({
            statusCode: 403,
            statusMessage: "Invalid credential",
            data: {
                isOk: false,
                error: {
                    wrongUsernameOrPassword: true
                }
            } as LoginResult
        })
    }
    
    const res = await generateSession(user, event)

    if (!res.ok) {
        throw createError({
            statusCode: 500,
        })
    }

    return {
        isOk: true,
        user: user
    } as LoginResult

})