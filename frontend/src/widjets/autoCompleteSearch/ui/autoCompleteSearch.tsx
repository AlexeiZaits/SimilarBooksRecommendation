import styles from "./styles.module.scss"
import { RecommendListSearch } from "features/recommendsSearch"
import { useSetViewRecommendSearch } from "features/recommendsSearch/hooks/use-set-recommend-search"
import { SearchRecommend } from "features/search"

export const AutoCompleteSearch = () => {
    //TODO: сделать в будущем загрузку из прошлы запросов
    const [view] = useSetViewRecommendSearch()

    return <>
        <SearchRecommend/>
        {view && <div className={styles.container}>
            <RecommendListSearch/>
        </div>}
    </>
}
