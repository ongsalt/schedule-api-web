import { object } from "zod"
import { Err, Ok, Result } from "~/types/result"
import { ScheduleFilter } from "~/types/schedule"

export const classRegex1 = /M\.[0-9]{1,}\/[0-9]{1,}/
export const classRegex2 = /[0-9]{1,}\/[0-9]{1,}/

export class FilterArgument {
    public argument: Map<keyof ScheduleFilter | "for", any>
    public scheduleFilter: ScheduleFilter

    constructor(
        argument?: Map<keyof ScheduleFilter | "for", any>
    ) {
        this.argument = argument ?? new Map()
        this.scheduleFilter = {
            start: 0,
            take: 999
        }
    }

    static parse(str: string): FilterArgument {
        const json = JSON.parse(str)

        if (typeof json !== "object") {
            throw new TypeError("Given string is not valid FilterArgument")
        }

        return new FilterArgument(json)
    }

    stringify(): string {
        return JSON.stringify(this.argument)
    }

    set(target: keyof ScheduleFilter | "for", value: any): Result<true> {
        this.argument.set(target, value)
        return this.updateScheduleFilter(target, value)
    }

    setIfUndefined(target: keyof ScheduleFilter | "for", value: any): Result<true> {
        if (this.argument.has(target)) {
            return Err(`already set ${target}: ${this.argument.get(target)}`)
        }
        this.argument.set(target, value)
        return this.updateScheduleFilter(target, value)
    }

    updateScheduleFilter(target: keyof ScheduleFilter | "for", value: any): Result<true> {
        if (target === "for") {
            const isValidClassString = classRegex1.test(value) || classRegex2.test(value)
            if (!isValidClassString) {
                return Err("This is not valid class")
            }
            const [forYear, forRoom] = (value as string).slice(2).split('/').map(num => parseInt(num))
            this.scheduleFilter.forYear = forYear
            this.scheduleFilter.forRoom = forRoom
            return Ok(true)
        }

        if (target === "period" || target === "forRoom" || target === "forYear") {
            const i = parseInt(value)
            if (!i) {
                return Err("This field must be number")
            }
            this.scheduleFilter[target] = i
            return Ok(true)
        }

        if (target === "day") {
            const lowered = (value as string).toLowerCase()
            if (
                !daysLowerCase.includes(lowered)
            ) {
                return Err("This filed must be day")
            }
            this.scheduleFilter.day = daysLowerCase.indexOf(lowered)
            return Ok(true)
        }
        
        if (typeof value !== "string") {
            return Err("This field must be string")
        }
        
        // @ts-ignore
        this.scheduleFilter[target] = value

        return Ok(true)
    }

    remove(key: keyof ScheduleFilter | "for") {
        this.argument.delete(key)
        if (key === "for") {
            delete this.scheduleFilter.forRoom
            delete this.scheduleFilter.forYear
        } else {
            delete this.scheduleFilter[key]
        }
    }

    has(key: keyof ScheduleFilter | "for"): boolean {
        return this.argument.has(key)
    }

}

export type SearchCommand = {
    text: string,
    key: keyof ScheduleFilter | "for",
    option?: string[] // if no option present -> accept any string
    getOption?: () => any, // Implement later using cache table on server built from reading all item in schedule table
    isNumber?: boolean,
    defualt: string
}