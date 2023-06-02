import { middleware } from "~/server/trpc/trpc";

export const auth = middleware(async (opts) => {

    const { ctx,  } = opts

    return opts.next({
        ctx: {

        }
    })
})