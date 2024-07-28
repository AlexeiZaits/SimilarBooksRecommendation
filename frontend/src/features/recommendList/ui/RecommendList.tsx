import { PreloaderModal } from "shared/ui/preloaderModal/ui/Preloader"
import { useRecommendList } from "../hooks/use-recommend-list"
import { Book } from "entities/index"
import styles from "./styles.module.scss";
import { Like } from "features/like/ui/Like";

export const RecommendList = () => {
    const [{status, books, qty},] = useRecommendList()


    return <div  className={styles.container}>
        {status === "loading" && <PreloaderModal/>}
        <div className={styles.books}>
            {qty !== 0 && books.map((item) => {
                return <Book style={{marginLeft: "3rem"}} key={item.uid} {...item}  children={<Like id={item.uid}/>}/>
            })}
        </div>
    </div>
}
