import '@/styles/index.css'import Drawer from "@/components/ui/Drawer/Drawer.tsx";import MobileBar from "@/components/ui/MobileBar/MobileBar.tsx";import DesktopLogo from "@/components/schedule/DesktopLogo/DesktopLogo.tsx";import {CSSProperties} from "react";const styleDrawerElement: CSSProperties = {marginTop: "20px", marginBottom: "20px"}function App() {    return (        <div className={"app light"}>            <MobileBar>                <DesktopLogo></DesktopLogo>            </MobileBar>            <Drawer>                <div style={styleDrawerElement}>                    <DesktopLogo></DesktopLogo>                </div>            </Drawer>        </div>    )}export default App