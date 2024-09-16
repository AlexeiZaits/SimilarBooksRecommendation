import styles from "./styles.module.scss";
import { ThemeSwitcher } from "features/themeSwitcher/ui/ThemeSwitcher";
import { LikeImg } from "shared/assets/icons/LikeImg";
import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "app/store/store";
import { selectQtyLikeBooks } from "features/likeList/modal/like-list-selectors";
import { useRecommendList } from "features/recommendList/hooks/use-recommend-list";
import { useSetLikeList } from "features/likeList/hooks/use-set-like-list";
import useWindowSize from "widjets/carusel/hooks/useWindowSize";
import { MenuIcon } from "shared/assets/icons/Menu"
import { useToggleWidjet } from "features/togglerWidjets/hooks/use-toggle-widget";
import { listWidjets } from "features/togglerWidjets/lib/listWidjets";

interface IHeader{
    children: ReactNode,
}

export const Header = ({children}:IHeader) => {
    const qtyLikes = useAppSelector(selectQtyLikeBooks)
    const [{qty},] = useRecommendList()
    const setLikeList = useSetLikeList()
    const windowSize = useWindowSize()
    const [, toggleWidjet] = useToggleWidjet(listWidjets.sidebar)

    useEffect(() => {
        const localBooks = JSON.parse(localStorage.getItem("likesBook") || "[]" );
        if (qty === 0 && localBooks.length !== 0) {
            console.log("localBook get")
            setLikeList(localBooks)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <header className={styles.header}>
        <div className={styles.logo}>
            <div onClick={toggleWidjet} className={styles.icon}><MenuIcon/></div>
        </div>
        <div className={styles.search}>
            {children}
        </div>
        <div className={styles.rigth}>
            <Link to={"likes"} className={styles.like}><LikeImg like={true}/><span className={styles.like_text}>{qtyLikes}</span></Link>
           {windowSize > 1024 &&  <div className={styles.theme}><ThemeSwitcher/></div>}
            <Link to={"authorization"}>Войти</Link>
        </div>
    </header>
}
