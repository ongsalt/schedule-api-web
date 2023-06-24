import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { scheduleRouter } from '~/server/trpc/routers/schedule'
import { subjectRouter } from '~/server/trpc/routers/subject'
import { taecherRouter } from '~/server/trpc/routers/teacher'

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      }
    }),
  schedule: scheduleRouter,
  subject: subjectRouter,
  teacher: taecherRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
