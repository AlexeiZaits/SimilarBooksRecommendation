import { useRecommendList } from "../hooks/use-recommend-list"
import { Book } from "entities/index"
import styles from "./styles.module.scss";
import { Like } from "features/like/ui/Like";
import { useInitialRecommends } from "../hooks/use-initial-recommends";
import { Preloader, withModal } from "shared/ui";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const PreloaderWithModal = withModal(Preloader)

export const RecommendList = () => {
    const [{status, books, qty}, getBooks] = useRecommendList()
    const {category} = useParams();

    useEffect(() => {
        if(category){
            getBooks({
                query: category,
                limit: 21,
                offset: 0,
        }, "get")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    useInitialRecommends()

    return <div  className={styles.container}>
        {status === "loading" && <PreloaderWithModal/>}
        <div className={styles.books}>
            {qty !== 0 && books.map((item) => {
                return <Book key={item.uid} children={<Like {...item}/>} {...item} />
            })}
        </div>
    </div>
}
