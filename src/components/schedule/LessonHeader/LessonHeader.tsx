import styles from "./LessonHeader.module.css"
import ClassHelper from 'classnames/bind';
import {ILesson} from "@/hooks/useShedule.ts";
import {getTimeLocale} from "@/helpers/DateHelper.tsx";

interface LessonHeaderProps {
    lesson: ILesson;
}

const classNames = ClassHelper.bind(styles);

const icons = {
    teacher: "person",
    location: "location_on",
    group: "groups"
}

const LessonHeader = ({lesson}: LessonHeaderProps) => {
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
        <div className={classNames("lesson-header")}>
            <div className={classNames("time-wrapper")}>
                <div className={classNames("start-time")}>{getTimeLocale(start)}</div>
                <div className={classNames("number")}>{pair}</div>
                <div className={classNames("end-time")}>{getTimeLocale(end)}</div>
            </div>

            <div className={classNames('devider')}></div>

            <div className={classNames("info-wrapper")}>
                <div className={classNames("chips")}>
                    {type && <div className={classNames("type", "chip")}>{type}</div>}
                    {subgroup && <div className={classNames("subgroup", "chip")}>{subgroup}</div>}
                    {isOnline && <div className={classNames("online", "chip")}>онлайн</div>}

                </div>
                <div className={classNames("discipline")}>{discipline}
                    {isConf && <span className={classNames("conf")}>(с видеотрансляцией)</span>}
                </div>
                <div className={classNames("characteristics")}>
                    {characteristic.map((el) =>
                        <div className={classNames("characteristic")} key={el.id}>
                            <span
                                className={classNames('material-icons-sharp', 'characteristic-icon')}>{icons[el.type]}</span>
                            {el.text}
                        </div>)}
                </div>
            </div>

        </div>
    );
};

export default LessonHeader;