import styles from './LessonList.module.css'
import {ButtonHTMLAttributes, useState} from "react";
import ClassHelper from "classnames/bind";
import ExpansionPanel from "@/components/ui/ExpansionPanel/ExpansionPanel.tsx";
import LessonHeader from "@/components/schedule/LessonHeader/LessonHeader.tsx";
import LessonContent from "@/components/schedule/LessonContent/LessonContent.tsx";
import NotLesson from "@/components/schedule/NotLesson/NotLesson.tsx";
import DayHeader from "@/components/schedule/DayHeader/DayHeader.tsx";
import {IDay, ILesson} from "@/hooks/useShedule.ts";

interface LessonListProps extends ButtonHTMLAttributes<HTMLDivElement> {
    schedule: IDay[],
    date: Date
}

const classNames = ClassHelper.bind(styles);


function LessonList({schedule, date}: LessonListProps) {
    const [panelObject, setPanelObject] = useState({group: -1, position: -1})

    function isNowLesson(lesson: ILesson) {
        return lesson.start.getTime() < date.getTime() && date.getTime() < lesson.end.getTime()
    }

    function isTodayLesson(lesson: ILesson) {
        return lesson.start.toLocaleDateString() == date.toLocaleDateString()
    }

    function openPanels(newPanel: { group: number, position: number }) {
        const {group: newGroup, position: newPosition} = newPanel
        const {group: currentGroup, position: currentPosition} = panelObject

        if (currentGroup == newGroup && currentPosition == newPosition) {
            setPanelObject({group: -1, position: -1})
        } else {
            setPanelObject(newPanel)
        }
    }

    function ExpansionPanelsJSX(lesson: ILesson, i: number, j: number) {
        const isOpen = panelObject.group == i && panelObject.position == j
        const isNow = isNowLesson(lesson)
        const isToday = isTodayLesson(lesson)
        const marginClass = lesson.isSubLesson ? "sub-lesson-margin" : "lesson-margin"
        return <ExpansionPanel
            open={isOpen}
            onOpen={() => openPanels({group: i, position: j})}
            className={classNames({"today": isToday}, {"now": isNow}, marginClass)}
            headerPanel={<LessonHeader lesson={lesson} open={isOpen}/>}
            contentPanel={<LessonContent lesson={lesson}/>}
            key={`${i}-${j}`}
        />
    }

    return (
        <div className={classNames('lesson-list')}>
            {schedule.map((day, i) => <div key={+day.date}>
                <DayHeader
                    isToday={day.date.toLocaleDateString() == date.toLocaleDateString()}
                    dayName={day.name}
                    dayDate={day.date.toLocaleDateString()}
                />
                {day.lesson.length
                    ? day.lesson.map((l, j) => ExpansionPanelsJSX(l, i, j))
                    : <NotLesson></NotLesson>
                }
            </div>)}
        </div>
    );
}

export default LessonList;