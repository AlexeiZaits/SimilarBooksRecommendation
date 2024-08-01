import { useAppDispatch } from "app/store/store"
import { clearRecommendSearch } from "../model/recommend-search-slice"

export const useClearReommendSearch = () => {
    const dispatch = useAppDispatch()

    const clearRecommends = () => dispatch(clearRecommendSearch())

    return clearRecommends
}
