import { LoginError } from "~~/types/auth/loginError"
import { User } from "~~/types/auth/user"

export type LoginResult = {
    isOk: boolean,
    error?: LoginError,
    user?: User
}