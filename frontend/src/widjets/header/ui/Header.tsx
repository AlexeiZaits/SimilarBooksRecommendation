import img from "shared/assets/icons/logo.png";
import styles from "./styles.module.scss";
import { ThemeSwitcher } from "features/themeSwitcher/ui/ThemeSwitcher";
import { LikeImg } from "shared/assets/icons/LikeImg";
import { ReactNode } from "react";

interface IHeader{
    children: ReactNode,
}

export const Header = ({children}:IHeader) => {

    return <div className={styles.header}>
        <div className={styles.logo}>
            <img src={img} alt="logo" />
            <span className={styles.text}>Similar Books Recommend</span>
        </div>
        <div className={styles.search}>
            {children}
        </div>
        <div className={styles.rigth}>
            <div className={styles.like}><LikeImg like={true}/><span className={styles.like_text}>0</span></div>
            <div className={styles.theme}><ThemeSwitcher/></div>
        </div>
    </div>
}
