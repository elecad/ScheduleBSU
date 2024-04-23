import {HTMLAttributes, ReactNode} from "react";
import styles from './Card.module.css'
import ClassHelper from "classnames/bind";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode,
}

const classNames = ClassHelper.bind(styles);

function Card({children, className, ...props}: CardProps) {
    return (
        <div className={classNames(styles.card, className)} {...props}>
            {children}
        </div>
    );
}

export default Card;