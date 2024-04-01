import styles from "./DayButton.module.css"
import ClassHelper from 'classnames/bind';
import {ButtonHTMLAttributes, ReactNode} from "react";

interface DayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

const classNames = ClassHelper.bind(styles);


const DayButton = ({children, ...props}: DayButtonProps) => {
    return (
        <button className={classNames("day-button")} {...props}>
            {children}
        </button>
    );
};

export default DayButton;