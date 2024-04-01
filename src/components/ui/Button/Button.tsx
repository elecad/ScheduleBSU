import styles from './Button.module.css'
import {ButtonHTMLAttributes} from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string
    iconType?: "two-tone" | "outlined" | "round" | "sharp"
    iconPosition?: "left" | "right"
}


function Button({children, icon = "", iconPosition = "left", iconType = "round", ...props}: ButtonProps) {

    return (
        <button className={styles.btn} {...props}>
            {icon && iconPosition == "left" &&
                <span className={classNames(`material-icons-${iconType}`)}>{icon}</span>}
            {children}
            {icon && iconPosition == "right" &&
                <span className={classNames(`material-icons-${iconType}`)}>icon</span>}
        </button>
    );
}

export default Button;