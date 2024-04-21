import styles from './Chip.module.css'
import {ButtonHTMLAttributes} from "react";
import ClassHelper from "classnames/bind";


const Colors: { [key: string]: string } = {
    "лаб.": "blue",
    "пр.з.": "green",
    "лек.": "purple",
    "зач.": "red",
    "экз.": "red",
    "конс.": "red",
    "курс.р.": "red",
    "курс.п.": "red",
    "дифф.зач.": "red",
    "пркт.-зач.": "red",
    "лаб.-зач.": "red",
    "защВКР": "red",
    "КонсВКР": "red",
    "ТЕСТ": "red",
    "пер.": "red",
    "ком.": "red",
    "практ.": "red",
    "subgroup": "dark-green",
    "online": "indigo"
}

interface ChipProps extends ButtonHTMLAttributes<HTMLDivElement> {
    icon?: string
    iconType?: "two-tone" | "outlined" | "round" | "sharp"
    iconPosition?: "left" | "right"
    keyClass: string;
}

const classNames = ClassHelper.bind(styles);

function Chip({
                  children,
                  icon = "",
                  iconPosition = "left",
                  iconType = "round",
                  className,
                  keyClass = "",
                  ...props
              }: ChipProps) {
    const colorClass = Colors[keyClass] ?? "";
    return (
        <div
            className={classNames(className, styles.chip, colorClass)} {...props}>
            {icon && iconPosition == "left" &&
                <span
                    className={classNames(`material-icons-${iconType}`)}>{icon}</span>}
            {children}
            {icon && iconPosition == "right" &&
                <span className={classNames(`material-icons-${iconType}`)}>icon</span>}
        </div>
    );
}

export default Chip;