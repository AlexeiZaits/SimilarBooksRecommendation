import { useAppDispatch, useAppSelector } from "app/store/store"
import { actionGetTitles } from "../model/recommend-search-actions"
import { selectRecommendSearch } from "../model/recommend-search-selectors"

export const useSearchRecommend = (): [
    ReturnType<typeof selectRecommendSearch>,
    (query: string) => void
] => {
    const dispatch = useAppDispatch()
    const searchRecommendInfo = useAppSelector(selectRecommendSearch)


    const searchRecommend = (query: string) => {
        if (query) {
            dispatch(actionGetTitles({query: query,
                limit: 9,
                offset: 0,
                }))
        }
    }

    return [searchRecommendInfo, searchRecommend]
}
