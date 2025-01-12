import classNames from "classnames"
import { NavLink, Outlet } from "react-router-dom"
import styles from "./styles.module.scss"

const navList = [{text: "Жанры", link: "genres"}, {text: "Что посмотреть?", link: "whatToSee"}, {text: "Аниме", link: "anime"}]

export const MainPage = () => {


    return <>
        <div className={styles.container}>
            <nav className={styles.nav}>
            {navList.map((item, index) => {
                    return <NavLink key={index} to={item.link}
                    className={({ isActive }) =>
                        classNames(styles.link, {
                            [styles.active]: isActive
                        })
                    }>
                            <span className={styles.text}>{item.text}</span>
                        </NavLink>
            })}
            </nav>
        </div>
        <Outlet/>
    </>
}
