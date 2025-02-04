import styles from "./styles.module.scss";
import { ReactNode, useEffect } from "react";
import { useRecommendList } from "features/recommendList/hooks/use-recommend-list";
import { useSetLikeList } from "features/likeList/hooks/use-set-like-list";
import { MenuIcon } from "shared/assets/icons/Menu"
import { useToggleWidjet } from "features/togglerWidjets/hooks/use-toggle-widget";
import { listWidgets } from "features/togglerWidjets/lib/listWidgets";
import { FaQuestion } from "react-icons/fa";
import { useAuthorization } from "features/authorization/hooks/use-authorization";
import { ThemeSwitcher } from "features/index";
import useWindowSize from "widjets/carusel/hooks/useWindowSize";
import { useLocation } from "react-router-dom";

interface IHeader{
    children: ReactNode,
}

export const Header = ({children}:IHeader) => {
    const [{qty},] = useRecommendList()
    const setLikeList = useSetLikeList()
    const [, toggleWidjet] = useToggleWidjet(listWidgets.sidebar)
    const [, {name}] = useAuthorization()
    const [setting, toggleOpen] = useToggleWidjet(listWidgets.settings)
    const windowSize = useWindowSize();
    const location = useLocation();

    const headerView = location.pathname.includes("watch")

    useEffect(() => {
        const localBooks = JSON.parse(localStorage.getItem("likesBook") || "[]" );
        if (qty === 0 && localBooks.length !== 0) {
            setLikeList(localBooks)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleMouseDown = () => {
        setTimeout(() => {
            !setting && toggleOpen();
        }, 0)
    }

    return  <>
        {!headerView && <header className={styles.header}>
                {windowSize > 1024 && <div className={styles.logo}>
                    <div onClick={toggleWidjet} className={styles.icon}><MenuIcon/></div>
                </div>}
                <div className={styles.search}>
                    {children}
                </div>
                {windowSize > 1024 && <div className={styles.rigth}>
                    {<div className={styles.theme}><ThemeSwitcher/></div>}
                    <button onMouseDown={handleMouseDown} className={styles.settings}>
                        {
                            name ?
                            <span>{name.slice(0,1)}</span>
                            :<FaQuestion className={styles.profile} size={19} />
                        }
                    </button>
                </div>}
        </header>}
    </>
}
