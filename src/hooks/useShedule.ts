import {useState} from "react";
import {dateToISO} from "@/helpers/DateHelper.tsx";

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
    isSubLesson: boolean
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
    const now = new Date()
    const [date, setDate] = useState(new Date(now.getTime() + 0 * MILLISECOND_IN_DAY))

    const [schedule, setSchedule] = useState<IDay[]>([])
    const monday = new Date(date.getTime() - MILLISECOND_IN_DAY * (date.getDay() - 1))
    if (!date.getDay()) {
        monday.setTime(monday.getTime() - 7 * MILLISECOND_IN_DAY)
    }
    const sunday = new Date(monday.getTime() + 6 * MILLISECOND_IN_DAY);

    console.log()

    const group = 12002331
    const from = dateToISO(monday)
    const to = dateToISO(sunday)
    const URL = `https://beluni.ru/schedule/g/${group}?from=${from}&to=${to}&qdist=1`


    async function getLesson() {
        const response = await fetch(URL); // завершается с заголовками ответа
        const data = await response.json()
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


        let prevPair = 0;
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
                links: l.links.reverse(),
                description: de,
                isSubLesson: !!prevPair && prevPair == l.pairnumber
            })
            prevPair = l.pairnumber;
        }
        if (result[6] && !result[0].lesson.length) {
            result.pop()
        }
        setSchedule(result);

    }

    function findUpdateTime() {
        console.log("[!] Текущая дата", date.toLocaleDateString(), date.toLocaleTimeString())
        setDate(new Date())
        let wait = MILLISECOND_IN_DAY * 3;
        for (const s of schedule) {
            for (const l of s.lesson) {
                const deltaStart = l.start.getTime() - date.getTime();
                const deltaEnd = l.end.getTime() - date.getTime();
                if (deltaStart > 0 && wait > deltaStart)
                    wait = deltaStart
                if (deltaEnd > 0 && wait > deltaEnd)
                    wait = deltaEnd
            }
        }
        if (wait <= MILLISECOND_IN_DAY) {
            const newDate = new Date(+date + wait)
            console.log("[!] Следующее обновление:", newDate.toLocaleDateString(), newDate.toLocaleTimeString())
            setTimeout(findUpdateTime, wait)
        }
    }

    return {schedule, getLesson, findUpdateTime, date}


}