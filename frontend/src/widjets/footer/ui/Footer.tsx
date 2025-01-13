import styles from "./styles.module.scss"
// import { useAuthorization } from "features/authorization/hooks/use-authorization"
// import { FaQuestion } from "react-icons/fa"
import useWindowSize from "widjets/carusel/hooks/useWindowSize"
import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { IoSearchOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaPlay } from "react-icons/fa";

const size = 20;

const navList = [{icon: <IoHome size={size}/>, text: "Главная", link: "/"},
    {icon: <IoSearchOutline size={size}/>, text: "Поиск", link: "/search"},
    {icon: <FaPlay size={20}/>, text: "Смотрю", link: "/watch"},
    {icon: <CiHeart size={size}/>, text: "Моё аниме", link: "/myAnime"},
    {icon: <CgProfile size={size}/>, text: "Профиль", link: "/profile"}]

export const Footer = () => {
    const windowSize = useWindowSize()
    // const [, {name}] = useAuthorization()


    return <>
        {windowSize < 1024 && <footer className={styles.footer}>
            {navList.map((item, index) => {
                return <NavLink key={index} to={item.link}
                className={({ isActive }) =>
                    classNames(styles.link, {
                        [styles.active]: isActive
                    })
                }>
                        <i className={styles.text}>{item.icon}</i>
                        <span className={styles.text}>{item.text}</span>
                    </NavLink>
            })}
        </footer>}
    </>
}
