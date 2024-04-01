export function getTimeLocale(date: Date) {
    const timeLocaleOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit"
    }
    return date.toLocaleTimeString(['ru-RU'], timeLocaleOptions)
}


export function getShortWeekDayName(date: Date) {
    const weekShortNames = [
        "ВС", "ПН", "ВТ", "CР", "ЧТ", "ПТ", "СБ"
    ];

    return weekShortNames[date.getDay()]
}

export function getMonthName(date: Date) {
    const monthNames = [
        "января",
        "февраля",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
    ]
    return monthNames[date.getMonth()]
}