import { useAppDispatch } from "app/store/store"
import { clearFocusElementRecommendSearch } from "../model/recommend-search-slice"

export const useClearFocusRecommends = () => {
    const dispatch = useAppDispatch()

    const clearFocus = () => dispatch(clearFocusElementRecommendSearch())

    return clearFocus
}
