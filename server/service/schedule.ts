import { getSchedulesByDaySince, getSchedulesByFilter } from "~/server/database/repositories/schedule";
import type { Period, PeriodLocation } from "~/types/period";
import { ScheduleRecommendation } from "~/types/schedule";

// Return [minuteOfDay, dayOfWeek]
export function getThaiTime(): number[] {
    const now = new Date()

    const offset = 7 * 60

    now.setUTCMinutes(now.getUTCMinutes() + offset)

    return [
        now.getUTCHours() * 60 + now.getUTCMinutes(), // cuz timezone exist
        now.getUTCDay()
    ]
}

export function getCurrentPeriod(test = false): Period {

    return {
        day: 1,
        period: 3,
        isInSchoolTime: true,
    }
    const [minutes, day] = getThaiTime();

    const alertTimes = [510, 560, 610, 660, 710, 760, 810, 860, 910, 960];

    let count = 0;
    for (const alertTime of alertTimes) {
        if (minutes < alertTime) {
            break
        };
        count++
    }

    return {
        isInSchoolTime: isInSchoolTimeCheck(day, count),
        day,
        period: count
    }
}

export function isInSchoolTimeCheck(day: number, period: number) {
    return (period <= 9) && (period > 0)
}


export function getNearbyPeriod(target: string) {
    let padding = 0

    switch (target) {
        case 'n':
            padding = 1;
            break;
        case 'N':
            padding = 1;
            break;
        case 'p':
            padding = -1;
            break;
        case 'P':
            padding = -1;
            break;
        default:
            padding = 0;
    }

    const time = getCurrentPeriod()
    if (time.isInSchoolTime) {
        time.period += padding
        time.isInSchoolTime = isInSchoolTimeCheck(time.day, time.period)
    }

    return time
}

export function getPeriodLocation(day: number, period: number, currentPeriod: Period): PeriodLocation {
    if (currentPeriod.day === day) {
        if (currentPeriod.period === period) {
            return "Current"
        }
        if (currentPeriod.period + 1 === period) {
            return "Next"
        }
    }
    return period
}

export async function getRecommendation(forYear: number, forClass: number): Promise<ScheduleRecommendation[]> {

    const period = getCurrentPeriod()

    console.log(period)

    // const p = await getSchedulesByFilter({
    //     forYear: forYear,
    //     forRoom: forClass,
    //     day: period.day
    // })

    const p = await getSchedulesByDaySince(forYear, forClass, period.day, period.period)
    
    const res: ScheduleRecommendation[] = p.map(it => {
        return {
            location: getPeriodLocation(it.day, it.period, period),
            period: it.period,
            subjectName: it.subject.name,
            subjectCode: it.subject.code,
            teacherName: it.subject.teachers.map(it => it.name).join(", "),
            room: it.room ?? ""
        }
    })

    // console.log("defwjhy3")

    // console.log(res)
    return res
}
