import { useEffect, useState } from "react";
import { IoMoon, IoMoonOutline } from 'react-icons/io5';
import styles from "./styles.module.scss";

export const ThemeSwitcher = () => {
    const [theme, setTheme] = useState("dark")

    const handleClick = () => {
        setTheme((prevState) => prevState === "dark" ? "light": "dark")
    }
    
    useEffect(() => {
        document.body.setAttribute("data-theme", theme)
    }, [theme])
    
    return <div onClick={handleClick}>
        {theme === 'light' ? (
            <IoMoonOutline size="14px" color="black"/>
        ) : (
            <IoMoon size="14px" />
        )}{' '}
      <span className={styles.text}>{theme === "dark"? "Dark": "Light"} theme</span>
    </div>
}