import '@/styles/index.css'
import Drawer from "@/components/ui/Drawer/Drawer.tsx";
import MobileBar from "@/components/ui/MobileBar/MobileBar.tsx";
import DesktopLogo from "@/components/schedule/DesktopLogo/DesktopLogo.tsx";
import {CSSProperties, useCallback, useEffect, useState} from "react";
import Card from "@/components/ui/Card/Card.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import classNames from "classnames";
import Content from "@/components/ui/Content/Content.tsx";
import {useSchedule} from "@/hooks/useShedule.ts";
import WeekPanel from "@/components/schedule/WeekPanel/WeekPanel.tsx";

import Autocomplite from "@/components/schedule/Autocomplite/Autocomplite.tsx";

import ScheduleHeader from "@/components/schedule/ScheuleHeader/ScheduleHeader.tsx";
import LessonList from "@/components/schedule/LessonList/LessonList.tsx";
import {DayPicker} from "react-day-picker";
import {ru} from "date-fns/locale";

type AppTheme = "light" | "dark";

const styleDrawerElement: CSSProperties = {
    marginTop: "20px",
    marginBottom: "20px",
}


const styleButtonList: CSSProperties = {display: "flex", flexWrap: "wrap", rowGap: "4px", columnGap: "4px"}

function App() {
    const [theme, setTheme] = useState<AppTheme>("light")
    const {schedule, getLesson, findUpdateTime, date} = useSchedule()

    useEffect(() => {
        getLesson()
    }, [])

    const themeClickHandler = useCallback(() => {
        const newTheme: AppTheme = theme == 'light' ? 'dark' : 'light'
        setTheme(newTheme)

    }, [theme])


    useEffect(() => {
        findUpdateTime()
    }, [schedule]);


    return (
        <div className={classNames('app', theme)}>
            <MobileBar>
                <DesktopLogo></DesktopLogo>
            </MobileBar>
            <Drawer>
                <DesktopLogo style={styleDrawerElement}></DesktopLogo>
                <Autocomplite/>
                <Card style={styleDrawerElement}>
                    <div className={'header'}>Debug-функции</div>
                    <div style={styleButtonList}>
                        <Button onClick={themeClickHandler}>Сменить тему</Button>
                    </div>
                </Card>

                <Card>
                    <DayPicker locale={ru} weekStartsOn={1} showOutsideDays mode={"range"}/>
                </Card>

            </Drawer>

            <Content>
                <ScheduleHeader name={"Группа 12002331"}></ScheduleHeader>
                <LessonList schedule={schedule} date={date}/>
            </Content>
            <WeekPanel days={schedule} date={date}></WeekPanel>
        </div>
    )
}

export default App
