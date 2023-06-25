import { Schedule } from "~/types/schedule";

const rng = (n = 1000) => Math.round(Math.random() * n)

const getRandomSubject = (day: number, period: number): Schedule => {
    return {
        forRoom: rng(10),
        forYear: rng(10),
        day: day,
        period: period,
        id: rng(),
        subjectId: rng(),
        subject: {
            code: `ส${rng(39999)}`,
            id: rng(),
            name: `เสือก${rng(999)}`,
            teacher: {
                name: `ครู${rng(99)}`,
                id: rng()
            }
        },
        room: rng(9999).toString()
    }
}

export function getRandomSubjects(day: number, period: number): Schedule[] {
    const res: Schedule[] = []

    for (let i = 1; i <= day; i++) {
        for (let j = 1; j <= period; j++) {
            res.push(getRandomSubject(i, j))
        }
    }

    return res
}