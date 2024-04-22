import styles from './NotLesson.module.css'
import {ButtonHTMLAttributes} from "react";
import ClassHelper from "classnames/bind";


interface NotLessonProps extends ButtonHTMLAttributes<HTMLDivElement> {
}

const classNames = ClassHelper.bind(styles);

function NotLesson({}: NotLessonProps) {

    return (
        <div className={classNames("not-lesson-wrapper")}>
            <div className={classNames('not-lesson')}>Занятий нет</div>
            <span className={classNames("material-icons-outlined", "not-lesson-icons")}>sentiment_very_satisfied</span>
        </div>
    );
}

export default NotLesson;