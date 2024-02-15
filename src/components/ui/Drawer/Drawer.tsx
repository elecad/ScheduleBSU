import styles from "./Drawer.module.css"
import ClassHelper from 'classnames/bind';
import {ReactNode} from "react";

interface DrawerProps {
    children?: ReactNode;
}

const classNames = ClassHelper.bind(styles);


const Drawer = ({children}: DrawerProps) => {
    return (
        <div className={classNames("drawer")}>
            {children}
        </div>
    );
};

export default Drawer;