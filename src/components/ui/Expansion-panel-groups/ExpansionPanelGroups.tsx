import styles from "./ExpansionPanelGroups.module.css"
import ClassHelper from 'classnames/bind';
import {cloneElement, HTMLAttributes, ReactComponentElement, ReactNode, useState} from "react";
import ExpansionPanel from "@/components/ui/Expansion-panel/ExpansionPanel.tsx";

interface ExpansionPanelGroupsProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactComponentElement<typeof ExpansionPanel>[]
}

const classNames = ClassHelper.bind(styles);
const ExpansionPanelGroups = ({children}: ExpansionPanelGroupsProps) => {
    const [openPosition, setOpenPosition] = useState(-1)

    function openHandler(index: number) {
        if (openPosition == index) {
            setOpenPosition(-1)
        } else {
            setOpenPosition(index)
        }
    }

    const panels = children.map((el, i) => {
        return cloneElement(el, {
            open: i == openPosition, onOpen: () => {
                openHandler(i)
            }
        })
    })
    return (
        <div>{panels}</div>
    );
};

export default ExpansionPanelGroups;