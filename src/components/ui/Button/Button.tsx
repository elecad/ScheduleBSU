import styles from './Button.module.css'
import {ButtonHTMLAttributes} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}


function Button({children, ...props}: ButtonProps) {
    return (
        <button className={styles.btn} {...props}>
            {children}
        </button>
    );
}

export default Button;