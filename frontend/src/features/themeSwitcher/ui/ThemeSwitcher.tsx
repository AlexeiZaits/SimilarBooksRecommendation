import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { LuSun } from "react-icons/lu";
import { FaCloudMoon } from "react-icons/fa";

export const ThemeSwitcher = () => {
    const [theme, setTheme] = useState("Тёмная")

    const handleClick = () => {
        setTheme((prevState) => prevState === "Тёмная" ? "Светлая": "Тёмная")
    }

    useEffect(() => {
        document.body.setAttribute("data-theme", theme === "Тёмная" ? "dark": "light")
    }, [theme])

    return <div className={styles.container} onClick={handleClick}>
        {theme === 'Светлая' ? (
            <LuSun cursor={"pointer"} size="24px" color="black"/>
        ) : (
            <FaCloudMoon cursor={"pointer"} size="24px" />
        )}{' '}
    </div>
}
