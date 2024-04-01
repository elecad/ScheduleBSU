import styles from "./LessonContent.module.css"
import ClassHelper from 'classnames/bind';
import {ReactNode} from "react";

interface LessonContentProps {
    children?: ReactNode;
}

const classNames = ClassHelper.bind(styles);


const LessonContent = ({children}: LessonContentProps) => {
    return (
        <div className={classNames("lesson-content")}>
            {children}
        </div>
    );
};

export default LessonContent;