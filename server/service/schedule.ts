import { Period } from "~/types/period";
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
        isInSchoolTime: false,
        day,
        period: count
    }
}

export function isInSchoolTimeCheck(time: Period) {
    if (!time.isInSchoolTime || !time.period) return false
    return (time.period <= 9) && (time.period > 0)
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
        time.isInSchoolTime = isInSchoolTimeCheck(time)
    }

    return time
}

export async function getRecommendation(forYear: number, forClass: number): Promise<ScheduleRecommendation[]> {
    const res: ScheduleRecommendation[] = []

    return res
}
