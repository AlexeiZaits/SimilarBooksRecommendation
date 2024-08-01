import { useAppDispatch, useAppSelector } from "app/store/store"
import { actionGetTitles } from "../model/recommend-search-actions"
import { TitlesRequest } from "shared/types/request"
import { selectRecommendSearch } from "../model/recommend-search-selectors"

export const useSearchRecommend = (): [
    ReturnType<typeof selectRecommendSearch>,
    (query: TitlesRequest) => void
] => {
    const dispatch = useAppDispatch()
    const searchRecommendInfo = useAppSelector(selectRecommendSearch)

    const searchRecommend = (query: TitlesRequest) => dispatch(actionGetTitles(query))

    return [searchRecommendInfo, searchRecommend]
}
