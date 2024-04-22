import styles from './ScheduleHeader.module.css'
import {ButtonHTMLAttributes} from "react";
import ClassHelper from "classnames/bind";
import Card from "@/components/ui/Card/Card.tsx";
import Button from "@/components/ui/Button/Button.tsx";


interface ScheduleHeaderProps extends ButtonHTMLAttributes<HTMLDivElement> {
    name: string
}

const classNames = ClassHelper.bind(styles);

function ScheduleHeader({name}: ScheduleHeaderProps) {
    return (
        <div className={classNames('schedule-header')}>
            <Card>
                <div className={classNames('schedule-name')}>{name}</div>
                <div className={classNames('separator')}></div>
                <div className={classNames("schedule-header-button-wrapper")}>
                    <Button icon={'chevron_left'} variant={"transparent"}></Button>
                    <Button variant={"transparent"}>Текущая неделя</Button>
                    <Button icon={'chevron_right'} variant={"transparent"}></Button>
                </div>

            </Card>
        </div>
    );
}

export default ScheduleHeader;