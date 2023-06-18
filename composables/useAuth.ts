import { LoginResult } from "~/types/auth/loginResult"
import { User } from "~/types/auth/user"


export function useAuth() {

    const login = async (username: string, password: string) => {
        const res = await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                username,
                password
            }
        })

        useState("user").value = res.user as User
        return res as LoginResult
    }

    return {
        login
    }
}