import styles from "./styles.module.scss"
import { RecommendListSearch } from "features/recommendsSearch"
import { useSetViewRecommendSearch } from "features/recommendsSearch/hooks/use-set-recommend-search"
import { SearchRecommend } from "features/search"

export const AutoCompleteSearch = () => {
    const [view] = useSetViewRecommendSearch()

    return <>
        <SearchRecommend/>
        {view && <div className={styles.container}>
            <RecommendListSearch/>
        </div>}
    </>
}
