import styles from "./WeekPanel.module.css"
import ClassHelper from 'classnames/bind';
import {HTMLAttributes, ReactNode} from "react";
import {IDay} from "@/hooks/useShedule.ts";
import {getMonthName, getShortWeekDayName} from "@/helpers/DateHelper.tsx";

interface WeekPanelProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode,
    days: IDay[]
}

const classNames = ClassHelper.bind(styles);


const WeekPanel = ({children, days}: WeekPanelProps) => {
    return (
        <div className={classNames("week-panel-wrapper")}>
            <div className={classNames("week-panel")}>
                {days.map((el) =>

                    <div className={classNames("signboard", "outer")}
                         key={el.name}>
                        <div
                            className={classNames("signboard", "front", "inner", "anim", {"front-disable": !el.lesson.length})}>
                            <div className={classNames("top-main", "anim")}>
                                <span>{getShortWeekDayName(el.date)}</span>
                            </div>
                            <div className={classNames("main", "anim")}>
                                <span>{getShortWeekDayName(el.date)}</span>
                            </div>
                            <div className={classNames("after-main", "anim")}>
                                <span>{el.date.getDate()}</span>
                            </div>
                            <div className={classNames("bottom-main", "red", "anim")}>
                                <span>{getMonthName(el.date)}</span>
                            </div>
                        </div>
                        <div
                            className={classNames("signboard", "left", "inner", "anim")}>
                            <span className={classNames("after-main", "anim")}>{el.lesson.length}</span>
                            <span className={classNames("bottom-main", "inner-bottom", "anim")}>пар</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeekPanel;