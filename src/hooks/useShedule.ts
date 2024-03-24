import {useState} from "react";

const MILLISECOND_IN_DAY = 86400000

interface fetchLesson {
    "pairnumber": number,
    "timestart": number,
    "timeend": number,
    "edworkkind": string,
    "subgroup": string,
    "dis": string,
    "room": null,
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

export function useSchedule() {
    const group = 12002331
    const from = '2024-03-11'
    const to = '2024-03-17'
    const URL = `https://beluni.ru/schedule/g/${group}?from=${from}&to=${to}&qdist=1`
    const now = new Date()
    const date = new Date(now.getTime() + 5 * MILLISECOND_IN_DAY)
    const [lesson, setLesson] = useState<fetchLesson[]>([])
    // console.log('Текущее', date)
    const monday = new Date(date.getTime() - MILLISECOND_IN_DAY * (date.getDay() - 1))
    if (!date.getDay()) {
        monday.setTime(monday.getTime() - 7 * MILLISECOND_IN_DAY)
    }
    const sunday = new Date(monday.getTime() + 6 * MILLISECOND_IN_DAY);
    // console.log('Понедельник', monday)
    // console.log('Воскресенье', sunday)
    async function getLesson() {
        const response = await fetch(URL); // завершается с заголовками ответа
        setLesson(await response.json()); // читать тело ответа в формате JSON

    }

    return {lesson, getLesson}


}