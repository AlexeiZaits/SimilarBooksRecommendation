import { RecommendSearch} from "entities/recommendSearch"
import { useSearchRecommend } from "../hooks/use-recommend-search"
import { useRecommendList } from "features/recommendList/hooks/use-recommend-list"
import { useSearch } from "features/search/hooks/use-search"
import { useClearReommendSearch } from "../hooks/use-clear-recommend-search"

export const RecommendListSearch = () => {
    const [{titles, qty}] = useSearchRecommend()
    const [, searchBooks] = useRecommendList()
    const [, setSearch] = useSearch()
    const clearRecommends = useClearReommendSearch()

    const handleClick = (title : string) => {
        searchBooks({
            query: title,
            limit: 24,
            offset: 0,
        })
        setSearch(title)
        clearRecommends()
    }

    return <>
        {qty !== 0 &&  titles.map((item, index) => {
            return <RecommendSearch key={index} onClick={handleClick} title={item}/>
        })}
    </>
}
