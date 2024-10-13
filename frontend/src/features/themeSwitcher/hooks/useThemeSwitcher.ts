import { useEffect, useState } from "react"

type TTheme = "Тёмная"| "Светлая";

export const useThemeSwitcher = (): [
    TTheme,
    () => void
] => {
    const [theme, setTheme] = useState<TTheme>("Тёмная")

    const handleClick = () => {
        setTheme((prevState) => prevState === "Тёмная" ? "Светлая": "Тёмная")
    }

    useEffect(() => {
        document.body.setAttribute("data-theme", theme === "Тёмная" ? "dark": "light")
    }, [theme])

    return [theme, handleClick]
}
