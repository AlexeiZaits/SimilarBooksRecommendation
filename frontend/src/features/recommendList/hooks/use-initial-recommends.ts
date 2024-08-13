import { useAppDispatch } from "app/store/store"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { actionSearchBooks } from "../model/recommend-list-actions"
import { useRecommendList } from "./use-recommend-list"
import { useSearchRecommend } from "features/recommendsSearch/hooks/use-recommend-search"
import { useSearch } from "features/search/hooks/use-search"

export const useInitialRecommends = () => {
    const dispatch = useAppDispatch()
    const [searchParams, ] = useSearchParams()
    const [{qty},] = useRecommendList()
    const [, searchRecommend] = useSearchRecommend()
    const [, setSearch] = useSearch()

    useEffect(() => {
        const params = searchParams.get("search")
        if (params !== null && qty === 0){
            setSearch(params)
            searchRecommend(params)
            dispatch(actionSearchBooks({
                query: params,
                limit: 24,
                offset: 0,
            }))
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
