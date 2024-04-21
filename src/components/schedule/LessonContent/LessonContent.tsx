import styles from "./LessonContent.module.css"
import ClassHelper from 'classnames/bind';
import {ILesson} from "@/hooks/useShedule.ts";
import Button from "@/components/ui/Button/Button.tsx";
import RoundButton from "@/components/ui/RoundButton/RoundButton.tsx";

interface LessonContentProps {
    lesson: ILesson;
}


const classNames = ClassHelper.bind(styles);


const descriptionIcons = {
    teacher: "person",
    location: "location_on",
    group: "groups"
}

const sсheduleIcons = {
    teacher: "person",
    location: "location_on",
    group: "groups"
}

const LessonContent = ({lesson}: LessonContentProps) => {
    const {
        description,
        links,
        characteristic
    } = lesson
    return (
        <div className={classNames("lesson-content")}>
            <div className={classNames("descriptions")}>
                {description.map((el) =>
                    <div className={classNames("description")} key={el.type}>
                            <span
                                className={classNames('material-icons-sharp', 'description-icon')}>{descriptionIcons[el.type]}</span>
                        {el.text}
                    </div>)}
            </div>
            <div className={classNames("lesson-content-wrapper")}>
                <div className={classNames("to-schedules")}>
                    {characteristic.map((el) => <Button icon={sсheduleIcons[el.type]} key={el.id} round
                                                        size={"small"} hint={"Расписание преподавателя"}></Button>)}
                </div>

                <div className={classNames("links")}>
                    {links.map((el) =>
                        <Button className={'link'} key={el.href}>{el.name}</Button>)}
                </div>
            </div>

        </div>
    );
};

export default LessonContent;