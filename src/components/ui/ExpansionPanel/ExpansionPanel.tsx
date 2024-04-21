import styles from "./ExpansionPanel.module.css"
import ClassHelper from 'classnames/bind';
import {HTMLAttributes, MouseEventHandler, ReactNode} from "react";

interface ExpansionPanelProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    headerPanel?: ReactNode;
    contentPanel?: ReactNode;
    open?: boolean;
    onOpen: MouseEventHandler;
}

const classNames = ClassHelper.bind(styles);


const ExpansionPanel = ({contentPanel, headerPanel, className, open, onOpen, ...props}: ExpansionPanelProps) => {

    return (
        <div className={classNames(className, 'expansion-panel')} {...props}>
            <div className={classNames('expansion-title', {'open': open})} onClick={onOpen}>{headerPanel}</div>
            <div className={classNames('expansion-content', {'open': open})}>
                <div className={classNames('expansion-panel-content-wrapper')}>
                    <div>
                        {contentPanel}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ExpansionPanel;