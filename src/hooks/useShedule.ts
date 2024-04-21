import {useState} from "react";

export const MILLISECOND_IN_DAY = 86400000

interface fetchLesson {
    "pairnumber": number,
    "timestart": number,
    "timeend": number,
    "edworkkind": string,
    "subgroup": string | null,
    "dis": string,
    "room"?: {
        "id": number,
        "name": string,
        "area": string,
        "address": string
    },
    "online": boolean,
    "withdist": boolean,
    "teacher": {
        "id": number,
        "name": string,
        "dep": string,
        "subdep": string,
        "pos": string
    },
    "links": [
        {
            "href": string,
            "name": string
        }
    ]
}

export interface IDay {
    name: string,
    date: Date,
    lesson: ILesson[]
}

export interface ILesson {
    pair: number
    start: Date
    end: Date
    type: string
    subgroup: string | null
    discipline: string
    isOnline: boolean
    isConf: boolean
    characteristic: ICharacteristic[]
    description: IDescription[]
    links: ILink[]
}

export interface ICharacteristic {
    id: number
    type: 'teacher' | 'group' | 'location'
    text: string
}

export interface IDescription {
    type: 'teacher' | 'group' | 'location'
    text: string
}

export interface ILink {
    href: string,
    name: string
}

export function useSchedule() {
    const group = 12002331
    const from = '2024-04-15'
    const to = '2024-04-21'
    const URL = `https://beluni.ru/schedule/g/${group}?from=${from}&to=${to}&qdist=1`
    const now = new Date()
    const date = new Date(now.getTime() + 0 * MILLISECOND_IN_DAY)
    const [lesson, setLesson] = useState<IDay[]>([])
    // console.log('Текущее', date)
    const monday = new Date(date.getTime() - MILLISECOND_IN_DAY * (date.getDay() - 1))
    if (!date.getDay()) {
        monday.setTime(monday.getTime() - 7 * MILLISECOND_IN_DAY)
    }
    const sunday = new Date(monday.getTime() + 6 * MILLISECOND_IN_DAY);
    // console.log(date.toLocaleDateString())
    console.log(monday.toLocaleDateString(), sunday.toLocaleDateString())
    // console.log('Понедельник', monday)
    // console.log('Воскресенье', sunday)
    async function getLesson() {
        const response = await fetch(URL); // завершается с заголовками ответа
        const data = await response.json()
        console.log("From server: ", data)
        transform(data)

    }

    function transform(lessons: fetchLesson[]) {
        const week = [
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
            "Воскресенье",
        ]
        const result: IDay[] = []

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(monday.getTime() + i * MILLISECOND_IN_DAY)
            result.push({name: week[i], date: currentDate, lesson: []})
        }


        for (const l of lessons) {
            const startDate = new Date(l.timestart * 1000)
            const endDate = new Date(l.timeend * 1000)
            let dayWeekPosition = startDate.getDay() - 1
            if (dayWeekPosition < 0) {
                dayWeekPosition = 6
            }

            const ch: ICharacteristic[] = []
            const de: IDescription[] = []

            if (l.teacher) {
                ch.push({type: 'teacher', id: l.teacher.id, text: `${l.teacher.name} (${l.teacher.pos})`})
                de.push(({type: 'teacher', text: `${l.teacher.dep} (${l.teacher.subdep})`}))
            }

            if (l.room) {
                ch.push({type: "location", id: l.room.id, text: l.room.name})
                de.push({type: "location", text: l.room.area})
            }

            if (l.online) {
                ch.push({type: "location", id: 0, text: "Онлайн курс"})
                de.push({type: "location", text: "Курс в СЭО Пегас"})
            }

            result[dayWeekPosition].lesson.push({
                discipline: l.dis,
                start: startDate,
                end: endDate,
                pair: l.pairnumber,
                subgroup: l.subgroup || null,
                isOnline: l.online,
                isConf: l.withdist,
                type: l.edworkkind,
                characteristic: ch,
                links: l.links,
                description: de
            })
        }
        if (result[6] && !result[0].lesson.length) {
            result.pop()
        }
        console.log("Transform: ", result)
        setLesson(result);

    }

    return {lesson, getLesson}


}