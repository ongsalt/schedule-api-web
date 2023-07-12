export type APISchedule = {
    subjectName: string,
    subjectCode: string,
    room?: string
    location: string, // Next / curernt 
    link?: string,
    teachers: string[],
    day: number,
    period: number,
}