import { PreloaderModal } from "shared/ui/preloaderModal/ui/Preloader"
import { useRecommendList } from "../hooks/use-recommend-list"
import { Book } from "entities/index"
import styles from "./styles.module.scss";
import { Like } from "features/like/ui/Like";
import { useInitialRecommends } from "../hooks/use-initial-recommends";
import { useEffect } from "react";
import { useSetLikeList } from "features/likeList/hooks/use-set-like-list";


export const RecommendList = () => {
    const [{status, books, qty},] = useRecommendList()
    useInitialRecommends()
    const setLikeList = useSetLikeList()

    useEffect(() => {
        const localBooks = JSON.parse(localStorage.getItem("likesBook") || "[]" );
        if (books.length === 0 && localBooks.length !== 0) {
            console.log("localBook get")
            setLikeList(localBooks)
        }
    }, [])

    return <div  className={styles.container}>
        {status === "loading" && <PreloaderModal/>}
        <div className={styles.books}>
            {qty !== 0 && books.map((item) => {
                return <Book style={{marginLeft: "3rem"}} key={item.uid} children={<Like {...item}/>} {...item} />
            })}
        </div>
    </div>
}
