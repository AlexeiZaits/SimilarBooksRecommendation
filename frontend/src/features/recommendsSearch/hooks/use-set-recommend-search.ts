import { useAppDispatch, useAppSelector } from "app/store/store"
import { selectView } from "../model/recommend-search-selectors"
import { setViewRecommendSearch } from "../model/recommend-search-slice"

export const useSetViewRecommendSearch  = ():[boolean, (view: boolean) => void] => {
    const dispatch = useAppDispatch()
    const view = useAppSelector(selectView)

    const setView = (view: boolean) => dispatch(setViewRecommendSearch(view))

    return [view, setView]
}
