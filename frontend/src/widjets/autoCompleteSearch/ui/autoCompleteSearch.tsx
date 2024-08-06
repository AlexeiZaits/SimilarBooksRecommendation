import styles from "./styles.module.scss"
import { useAppSelector } from "app/store/store"
import { RecommendListSearch } from "features/recommendsSearch"
import { selectRecommendSearch } from "features/recommendsSearch/model/recommend-search-selectors"
import { SearchRecommend } from "features/search"

export const AutoCompleteSearch = () => {
    //TODO: сделать в будущем загрузку из прошлы запросов
    const {qty} = useAppSelector(selectRecommendSearch)

    return <>
        <SearchRecommend/>
        {qty !== 0 && <div className={styles.container}>
            <RecommendListSearch/>
        </div>}
    </>
}
