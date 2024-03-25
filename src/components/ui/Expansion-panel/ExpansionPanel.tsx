import styles from "./ExpansionPanel.module.css"
import ClassHelper from 'classnames/bind';
import {MouseEventHandler, ReactNode} from "react";

interface ExpansionPanelProps {
    children?: ReactNode;
    title: ReactNode;
    content: ReactNode;
    open?: boolean;
    onOpen: MouseEventHandler;
}

const classNames = ClassHelper.bind(styles);


const ExpansionPanel = ({content, title, open, onOpen}: ExpansionPanelProps) => {


    return (
        <div className={classNames('expansion-panel')}>
            <div className={classNames('expansion-title', {'open': open})} onClick={onOpen}>{title}</div>
            <div className={classNames('expansion-content', {'open': open})}>
                <div className={classNames('expansion-panel-content-wrapper')}>
                    <div>
                        {content}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ExpansionPanel;