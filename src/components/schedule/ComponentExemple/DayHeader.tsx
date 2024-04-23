import styles from './DayHaeder.module.css'
import {ButtonHTMLAttributes} from "react";
import ClassHelper from "classnames/bind";

interface DayHeaderProps extends ButtonHTMLAttributes<HTMLDivElement> {

}

const classNames = ClassHelper.bind(styles);

function DayHeader() {

    return (
        <div className={classNames("lesson-list")}></div>
    );
}

export default DayHeader;