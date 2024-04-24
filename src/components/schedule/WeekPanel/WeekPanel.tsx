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

    return (
        <div className={classNames("week-panel-wrapper")}>
            <div className={classNames("week-panel")}>
                {days.map((day) =>
                    <div className={classNames("signboard", "outer")}
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
                                className={classNames("bottom-main", "inner-bottom", "anim", {"label-off": !day.lesson.length})}>пар</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeekPanel;