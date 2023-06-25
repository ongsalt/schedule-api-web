export type Period = {
    isInSchoolTime: boolean,
    day: number,
    period: number
}

export enum PeriodLocation {
    Current,
    Next,
    Other,
}