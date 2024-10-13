import styles from "./styles.module.scss";
import { LuSun } from "react-icons/lu";
import { FaCloudMoon } from "react-icons/fa";
import { useThemeSwitcher } from "../hooks/useThemeSwitcher";

export const ThemeSwitcher = () => {
    const [theme, handleClick] = useThemeSwitcher()

    return <div className={styles.container} onClick={handleClick}>
        {theme === 'Светлая' ? (
            <LuSun cursor={"pointer"} size="24px" color="black"/>
        ) : (
            <FaCloudMoon cursor={"pointer"} size="24px" />
        )}{' '}
    </div>
}
