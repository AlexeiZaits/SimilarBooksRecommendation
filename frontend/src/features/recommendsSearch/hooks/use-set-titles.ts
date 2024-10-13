import { useAppDispatch } from "app/store/store"
import { setTitlesRecommendSearch, titlesRecommend } from "../model/recommend-search-slice"

export const useSetTitles = () => {
    const dispatch = useAppDispatch()

    const setTitles = (titles: titlesRecommend[]) =>  dispatch(setTitlesRecommendSearch(titles));

    return setTitles
}
