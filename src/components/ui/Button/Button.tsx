import styles from './Button.module.css'
import {ButtonHTMLAttributes} from "react";
import ClassHelper from "classnames/bind";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string
    iconType?: "two-tone" | "outlined" | "round" | "sharp"
    iconPosition?: "left" | "right",
    round?: boolean,
    variant?: "default" | "transparent",
    size?: "small" | "normal",
}


const classNames = ClassHelper.bind(styles);

function Button({
                    children,
                    icon = "",
                    iconPosition = "left",
                    iconType = "round",
                    className,
                    round = false,
                    size = "normal",
                    variant = "default",
                    ...props
                }: ButtonProps) {
    return (

        <button
            className={classNames(className,
                styles.btn,
                {[styles.round]: round},
                {[styles.small]: size == "small"},
                {[variant]: variant == "transparent"})} {...props}>
            {icon && iconPosition == "left" &&
                <span
                    className={classNames(`material-icons-${iconType}`)}>{icon}</span>}
            {children}
            {icon && iconPosition == "right" &&
                <span className={classNames(`material-icons-${iconType}`)}>icon</span>}

        </button>

    );
}

export default Button;