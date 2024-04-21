import styles from "./LessonHeader.module.css"
import ClassHelper from 'classnames/bind';
import {ILesson} from "@/hooks/useShedule.ts";
import {getTimeLocale} from "@/helpers/DateHelper.tsx";
import Chip from "@/components/schedule/Chip/Chip.tsx";

interface LessonHeaderProps {
    lesson: ILesson;
    open: boolean
}

const classNames = ClassHelper.bind(styles);

const icons = {
    teacher: "person",
    location: "location_on",
    group: "groups"
}

const LessonHeader = ({lesson, open}: LessonHeaderProps) => {
    const {
        start,
        end,
        pair,
        type,
        subgroup,
        isOnline,
        isConf,
        discipline,
        characteristic
    } = lesson
    return (
        <div className={classNames("lesson-header-wrapper")}>
            <div className={classNames("lesson-header")}>
                {/*<div className={classNames("now")}></div>*/}
                <div className={classNames("time-wrapper")}>
                    <div className={classNames("start-time")}>{getTimeLocale(start)}</div>
                    <div className={classNames("number")}>{pair}</div>
                    <div className={classNames("end-time")}>{getTimeLocale(end)}</div>
                </div>

                <div className={classNames('devider')}></div>

                <div className={classNames("info-wrapper")}>
                    <div className={classNames("chips")}>
                        {type && <Chip className={classNames("type")} keyClass={type}>{type}</Chip>}
                        {subgroup && <Chip className={classNames("subgroup")} keyClass={'subgroup'}>{subgroup}</Chip>}
                        {isOnline && <Chip className={classNames("online")} keyClass={"online"}>онлайн</Chip>}

                    </div>
                    <div className={classNames("discipline")}>{discipline}
                        {isConf && <span className={classNames("conf")}>(с видеотрансляцией)</span>}
                    </div>
                    <div className={classNames("characteristics")}>
                        {characteristic.map((el) =>
                            <div className={classNames("characteristic")} key={el.id}>
                            <span
                                className={classNames('material-icons-sharp', 'characteristic-icon', {"active-icon": open})}>{icons[el.type]}</span>
                                {el.text}
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonHeader;