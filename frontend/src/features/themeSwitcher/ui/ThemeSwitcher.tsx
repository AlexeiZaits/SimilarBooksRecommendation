import { useEffect, useState } from "react";
import { IoMoon, IoMoonOutline } from 'react-icons/io5';
import styles from "./styles.module.scss";

export const ThemeSwitcher = () => {
    const [theme, setTheme] = useState("Тёмная")

    const handleClick = () => {
        setTheme((prevState) => prevState === "Тёмная" ? "Светлая": "Тёмная")
    }

    useEffect(() => {
        document.body.setAttribute("data-theme", theme=== "Тёмная" ? "dark": "light")
    }, [theme])

    return <div onClick={handleClick}>
        {theme === 'Светлая' ? (
            <IoMoonOutline size="14px" color="black"/>
        ) : (
            <IoMoon size="14px" />
        )}{' '}
      <span className={styles.text}>{theme === "Тёмная"? "Тёмная": "Светлая"} тема</span>
    </div>
}
