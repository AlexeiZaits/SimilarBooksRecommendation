import { useAppDispatch } from "app/store/store"
import { clearRecommendBooks } from "../model/recommend-list-slice"

export const useClearRecommends = () => {
    const dispatch = useAppDispatch()

    const clearRecommends = () => dispatch(clearRecommendBooks())

    return clearRecommends
}
