import img from "shared/assets/icons/logo.png";
import styles from "./styles.module.scss";
import { ThemeSwitcher } from "features/themeSwitcher/ui/ThemeSwitcher";
import { LikeImg } from "shared/assets/icons/LikeImg";
import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "app/store/store";
import { selectQtyLikeBooks } from "features/likeList/modal/like-list-selectors";
import { useRecommendList } from "features/recommendList/hooks/use-recommend-list";
import { useSetLikeList } from "features/likeList/hooks/use-set-like-list";

interface IHeader{
    children: ReactNode,
}

export const Header = ({children}:IHeader) => {
    const qtyLikes = useAppSelector(selectQtyLikeBooks)
    const [{qty},] = useRecommendList()
    const setLikeList = useSetLikeList()

    useEffect(() => {
        const localBooks = JSON.parse(localStorage.getItem("likesBook") || "[]" );
        if (qty === 0 && localBooks.length !== 0) {
            console.log("localBook get")
            setLikeList(localBooks)
        }
    }, [])

    return <div className={styles.header}>
        <div className={styles.logo}>
            <img src={img} alt="logo" />
            <span className={styles.text}>Similar Books Recommend</span>
        </div>
        <div className={styles.search}>
            {children}
        </div>
        <div className={styles.rigth}>
            <Link to={"likes"} className={styles.like}><LikeImg like={true}/><span className={styles.like_text}>{qtyLikes}</span></Link>
            <div className={styles.theme}><ThemeSwitcher/></div>
        </div>
    </div>
}
