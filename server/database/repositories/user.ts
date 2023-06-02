import { User } from "@prisma/client";
import { prisma } from "~/server/database/prisma/client";

export async function getUser(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: {
            username
        }
    })
} 