import { useAppDispatch } from "app/store/store"
import { setTitlesRecommendSearch } from "../model/recommend-search-slice"

export const useSetTitles = () => {
    const dispatch = useAppDispatch()

    const setTitles = (titles: string[]) => dispatch(setTitlesRecommendSearch(titles))

    return setTitles
}
