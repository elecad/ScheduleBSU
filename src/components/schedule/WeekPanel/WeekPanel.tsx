import styles from "./WeekPanel.module.css"
import ClassHelper from 'classnames/bind';
import {HTMLAttributes, ReactNode} from "react";
import {IDay} from "@/hooks/useShedule.ts";
import {getMonthName, getShortWeekDayName} from "@/helpers/DateHelper.tsx";

interface WeekPanelProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
    days: IDay[]
    date: Date
}

const classNames = ClassHelper.bind(styles);


const WeekPanel = ({days, date}: WeekPanelProps) => {

    function isToday(day: IDay) {
        return day.date.toLocaleDateString() == date.toLocaleDateString()
    }

    function clickHandler(day: IDay) {
        const element = day.element;
        if (element) {
            const positions = element.getBoundingClientRect()
            const offset = 5;
            const top = positions.y + window.scrollY - offset
            window.scroll({behavior: "smooth", top})
        }
    }

    function getPairBottomLabel(num: number) {
        let label = "пар"
        if (num == 1)
            label = "пара"
        else if (num == 2 || num == 3)
            label = "пары"

        return label

    }

    return (
        <div className={classNames("week-panel-wrapper")}>
            <div className={classNames("week-panel")}>
                {days.map((day) =>
                    <div onClick={() => clickHandler(day)} className={classNames("signboard", "outer")}
                         key={+day.date}>
                        <div
                            className={classNames("signboard", "front", "inner", "anim", {"front-disable": !day.lesson.length})}>
                            <div className={classNames("top-main", "anim", {"label-disable": !day.lesson.length})}>
                                <span>{getShortWeekDayName(day.date)}</span>
                            </div>
                            <div className={classNames("main", "anim", {"today": isToday(day)})}>
                                <span>{getShortWeekDayName(day.date)}</span>
                            </div>
                            <div className={classNames("after-main", "anim")}>
                                <span>{day.date.getDate()}</span>
                            </div>
                            <div
                                className={classNames("bottom-main", "bottom-label", "anim", {"label-disable": !day.lesson.length})}>
                                <span>{getMonthName(day.date)}</span>
                            </div>
                        </div>
                        <div
                            className={classNames("signboard", "left", "inner", "anim", {"back-disable": !day.lesson.length})}>

                            <span className={classNames("after-main", "anim")}>{day.lesson.length}</span>
                            <span
                                className={classNames("bottom-main", "inner-bottom", "anim", {"label-off": !day.lesson.length})}>{getPairBottomLabel(day.lesson.length)}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeekPanel;