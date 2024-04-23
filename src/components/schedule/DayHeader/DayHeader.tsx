import styles from './DayHaeder.module.css'
import {ButtonHTMLAttributes} from "react";
import ClassHelper from "classnames/bind";
import Card from "@/components/ui/Card/Card.tsx";

interface DayHeaderProps extends ButtonHTMLAttributes<HTMLDivElement> {
    isToday: boolean,
    dayName: string,
    dayDate: string
}

const classNames = ClassHelper.bind(styles);


function DayHeader({dayName, dayDate, isToday}: DayHeaderProps) {
    return (
        <Card
            className={classNames("day-header")}>
            {isToday && <div className={classNames("today")}></div>}
            <div className={classNames("name-day")}>{dayName}</div>
            <div className={classNames("date-day")}>{dayDate}</div>
        </Card>
    );
}

export default DayHeader;