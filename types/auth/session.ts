import { User } from "./user"

export interface Session {
    authToken: string,
    userId?: number
    user?: User,
}