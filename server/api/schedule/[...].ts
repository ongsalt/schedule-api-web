import { getCurrentPeriod, getCurrentSchedule } from "~/server/service/schedule"
import { APISchedule } from "~/types/api/schedule"
import { APICache, toAPICache } from "~/types/apiCache"

export default defineEventHandler(async event => {
    const subpath = event.path.split('/').slice(3)

    const target = 'm65'

    const cache = useStorage(`schedule:current`)
    
    // if (await cache.hasItem(target)) {
    //     return (await cache.getItem(target) as APICache<APISchedule>).data
    // }

    const { day, period, isInSchoolTime } = getCurrentPeriod()

    if (!isInSchoolTime) {
        return { }
    }

    const res = await cache.getItem(target) as APICache<APISchedule>

    if (!res || res.data.period != period || res.data.day != day) {
        console.log(res)
        const schedule = await getCurrentSchedule(440, 520)
        if (schedule.ok) {
            cache.setItem(target, toAPICache(schedule.data))
            console.log("Updating")
            return schedule.data
        } else {
            return sendError(event, createError({
                statusCode: 500,
                statusMessage: "Failed to get schedule"
            }))
        }
    } else {   
        console.log("Do not update")
        return res.data
    }
})