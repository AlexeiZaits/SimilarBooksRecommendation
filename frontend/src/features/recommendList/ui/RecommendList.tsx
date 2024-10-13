import { Book } from "entities/index"
import { Like } from "features/like/ui/Like";
import { Preloader, withModal } from "shared/ui";
import { useRecommendList } from "../hooks/use-recommend-list"
import { useInitialRecommends } from "../hooks/use-initial-recommends";
import { useCategoryBooks } from "../hooks/use-category-books";
import styles from "./styles.module.scss";

const PreloaderWithModal = withModal(Preloader)

export const RecommendList = () => {
    const [{status, books, qty}] = useRecommendList()
    useCategoryBooks()
    useInitialRecommends()

    return <div  className={styles.container}>
        {status === "loading" && <PreloaderWithModal/>}
        <div className={styles.books}>
            {qty !== 0 && books.map((item) => {
                return <Book key={item.uid} {...item}><Like {...item}/></Book>
            })}
        </div>
    </div>
}
