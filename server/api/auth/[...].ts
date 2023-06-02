import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// TODO: 
//  - Change to credentails provider later 
//    Set up bcrypt authorize logic => (User | null)
//  - use getServerSession in tRPC auth context

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    providers: [
        //  @ts-expect-error
        CredentialsProvider.default({
            name: 'Username and Password',
            id: 'username',

            credentials: {
                username: { label: "Username", type: "text", placeholder: "Tee tuanmuan" },
                password: { label: "Password", type: "password" }
            },
            //  @ts-expect-error
            async authorize(credentials, req) {
                console.log(req.body)
                return null
            }
        }),
    ]
})
