import { Schedule } from "~/types/schedule";

const rng = (n = 1000) => Math.round(Math.random() * n)

const getRandomSubject = (day: number, period: number) => {
    return {
        classId: rng(),
        day: day,
        period: period,
        id: rng(),
        subjectId: rng(),
        subject: {
            code: `ส${rng()}`,
            id: rng(),
            name: `เสือก${rng()}`
        }
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