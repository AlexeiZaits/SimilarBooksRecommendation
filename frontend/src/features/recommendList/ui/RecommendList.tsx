import { useRecommendList } from "../hooks/use-recommend-list"
import { Book } from "entities/index"
import styles from "./styles.module.scss";
import { Like } from "features/like/ui/Like";
import { useInitialRecommends } from "../hooks/use-initial-recommends";
import { Preloader, withModal } from "shared/ui";

const PreloaderWithModal = withModal(Preloader)


export const RecommendList = () => {
    const [{status, books, qty},] = useRecommendList()
    useInitialRecommends()
    console.log("render")
    return <div  className={styles.container}>
        {status === "loading" && <PreloaderWithModal/>}
        <div className={styles.books}>
            {qty !== 0 && books.map((item) => {
                return <Book style={{marginLeft: "3rem"}} key={item.uid} children={<Like {...item}/>} {...item} />
            })}
        </div>
    </div>
}
