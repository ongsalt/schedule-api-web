import { Time } from "~/types/time"

export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
export type Day = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

export const startTime: Time = {
    hour: 8,
    minute: 30
}

export function addMinute(time: Time, adder: Time) {
    const carry = Math.floor((time.minute + adder.minute) / 60)
    time.hour += (adder.hour + carry) % 24
    time.minute = (adder.minute + time.minute) % 60
}

export const workDays = days.slice(1, 6)

export function getTimeBoundary(periods: number, length: number): Time[][] {
    const current = structuredClone(startTime)

    const boundaries: Time[][] = []
    for (let i = 0; i < periods; i++) {
        const boundary: Time[] = []
        boundary.push(structuredClone(current))
        addMinute(current, { hour: 0, minute: length })
        boundary.push(structuredClone(current))

        boundaries.push(boundary)
    }

    console.log(boundaries)

    return boundaries
}