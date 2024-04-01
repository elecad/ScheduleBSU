import styles from "./Content.module.css"
import ClassHelper from 'classnames/bind';
import {ReactNode} from "react";

interface ContentProps {
    children?: ReactNode;
}

const classNames = ClassHelper.bind(styles);


const Content = ({children}: ContentProps) => {
    return (

        <div className={classNames("content")}>
            {children}
        </div>


    );
};

export default Content;