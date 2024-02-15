import styles from "./DesktopLogo.module.css";
import ClassHelper from "classnames/bind";

const classNames = ClassHelper.bind(styles);

function DesktopLogo() {
    return (
        <div className={styles.drawerLogoContainer}>
            <span className={classNames("material-icons-two-tone", styles.drawerLogoIcon)}>school</span>
            <div className={styles.drawerLogo}>Расписание</div>
            <div className={styles.drawerLabel}>test-version</div>
        </div>
    );
}

export default DesktopLogo;