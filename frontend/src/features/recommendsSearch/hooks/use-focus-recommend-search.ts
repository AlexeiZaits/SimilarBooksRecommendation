import { useAppDispatch, useAppSelector } from "app/store/store"
import { selectRecommendSearch } from "../model/recommend-search-selectors"
import { setFocusRecommendSearch } from "../model/recommend-search-slice"

export const useFocusRecommendSearch = ():
[boolean,
 (toggle: boolean) => void,
]=>{
    const dispatch = useAppDispatch()
    const {isFocus} = useAppSelector(selectRecommendSearch)

    const setFocus = (toggle: boolean) => dispatch(setFocusRecommendSearch(toggle))

    return [isFocus, setFocus]
}
