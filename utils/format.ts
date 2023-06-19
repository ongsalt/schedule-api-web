import { Schedule } from "~/types/schedule"

export function formatSchedule(pool: Schedule[]): (Schedule | undefined)[][] {
    const period = pool.reduce((previous, it) => {
        return Math.max(previous, it.period)
    }, 0)
    const day = pool.reduce((previous, it) => {
        return Math.max(previous, it.day)
    }, 0)

    const res: (Schedule | undefined)[][] = Array.from({ length: day }, it => Array.from({ length: period }, it => undefined))

    for (let schedule of pool) {
        console.log(schedule)
        res[schedule.day - 1][schedule.period - 1] = schedule
    }

    return res
}