import {ReactNode} from "react";
import styles from "./MobileBar.module.css"

interface MobileBarProps {
    children?: ReactNode;
}

const MobileBar = ({children}: MobileBarProps) => {
    return (
        <div className={styles.mobileBar}>
            {children}
        </div>
    );
};

export default MobileBar;