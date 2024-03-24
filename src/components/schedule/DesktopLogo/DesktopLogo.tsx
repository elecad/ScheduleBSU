import styles from "./DesktopLogo.module.css";
import ClassHelper from "classnames/bind";
import {HTMLAttributes} from "react";


const classNames = ClassHelper.bind(styles);


function DesktopLogo(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={styles.drawerLogoContainer} {...props}>
            <span className={classNames("material-icons-two-tone", styles.drawerLogoIcon)}>school</span>
            <div className={styles.drawerLogo}>Расписание</div>
            <div className={styles.drawerLabel}>test-version</div>
        </div>
    );
}

export default DesktopLogo;