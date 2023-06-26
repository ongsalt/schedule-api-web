import { z } from "zod"

export type Period = {
    isInSchoolTime: boolean,
    day: number,
    period: number
}

export const ZPeriodLocation = z.literal("Current").or(z.literal("Next")).or(z.number())

export type PeriodLocation  = z.infer<typeof ZPeriodLocation> 