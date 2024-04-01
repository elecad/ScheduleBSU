import '@/styles/index.css'import Drawer from "@/components/ui/Drawer/Drawer.tsx";import MobileBar from "@/components/ui/MobileBar/MobileBar.tsx";import DesktopLogo from "@/components/schedule/DesktopLogo/DesktopLogo.tsx";import {CSSProperties, useCallback, useEffect, useState} from "react";import Card from "@/components/ui/Card/Card.tsx";import Button from "@/components/ui/Button/Button.tsx";import classNames from "classnames";import Content from "@/components/ui/Content/Content.tsx";import {useSchedule} from "@/hooks/useShedule.ts";import ExpansionPanel from "@/components/ui/ExpansionPanel/ExpansionPanel.tsx";import styles from "@/components/schedule/DesktopLogo/DesktopLogo.module.css";import LessonHeader from "@/components/schedule/LessonHeader/LessonHeader.tsx";import {getMonthName, getShortWeekDayName} from "@/helpers/DateHelper.tsx";import WeekPanel from "@/components/schedule/WeekPanel/WeekPanel.tsx";import LessonContent from "@/components/schedule/LessonContent/LessonContent.tsx";type AppTheme = "light" | "dark";const styleDrawerElement: CSSProperties = {    marginTop: "20px",    marginBottom: "20px",}const styleDayHeader: CSSProperties = {    backgroundColor: "#3f51b5",    color: "white",    marginBottom: "10px",    fontWeight: 600,    display: "flex",    alignItems: "center",    justifyContent: "space-between",    position: "sticky"}const styleButtonList: CSSProperties = {display: "flex", flexWrap: "wrap", rowGap: "4px", columnGap: "4px"}function App() {    const [theme, setTheme] = useState<AppTheme>("light")    const {lesson, getLesson} = useSchedule()    const [openPanel, setOpenPanel] = useState(-1)    function openHandler(index: number) {        const newPosition = openPanel != index ? index : -1        setOpenPanel(newPosition)    }    useEffect(() => {        getLesson()    }, [])    const themeClickHandler = useCallback(() => {        const newTheme: AppTheme = theme == 'light' ? 'dark' : 'light'        setTheme(newTheme)    }, [theme])    return (        <div className={classNames('app', theme)}>            <MobileBar>                <DesktopLogo></DesktopLogo>            </MobileBar>            <Drawer>                <DesktopLogo style={styleDrawerElement}></DesktopLogo>                <Card style={styleDrawerElement}>                    <div className={'header'}>Debug-функции</div>                    <div style={styleButtonList}>                        <Button onClick={themeClickHandler}>Сменить тему</Button>                    </div>                </Card>            </Drawer>            <Content>                <div className={classNames('schedule-header')}>                    <Card style={{marginBottom: "20px"}}>                        <div className={classNames('schedule-name')}>Группа 12002331</div>                        <hr/>                        <div style={{                            display: "flex",                            justifyContent: "center",                            alignItems: "stretch",                            gap: "20px"                        }}>                            <Button icon={'chevron_left'}></Button>                            <Button>Текущая неделя</Button>                            <Button icon={'chevron_right'}></Button>                        </div>                    </Card>                </div>                <div className={classNames('lesson-list')}>                    {lesson.map((el, index) => {                        return <>                            <Card style={styleDayHeader}>                                <div>{el.name}</div>                                <div>{el.date.toLocaleDateString()}</div>                            </Card>                            {                                el.lesson.length ?                                    el.lesson.map((l) =>                                        <ExpansionPanel open={index == openPanel} onOpen={() => {                                            openHandler(index)                                        }}                                                        headerPanel={<LessonHeader lesson={l}/>}                                                        contentPanel={<LessonContent lesson={l}/>}                                                        style={{marginBottom: '10px'}}/>                                    ) : <div className={classNames("not-lesson-wrapper")}>                                        <div className={classNames('not-lesson')}>Занятий нет</div>                                    </div>                            }                        </>                    })}                </div>            </Content>            <WeekPanel days={lesson}></WeekPanel>        </div>    )}export default App