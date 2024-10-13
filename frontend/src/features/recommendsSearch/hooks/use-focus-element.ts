import { useAppDispatch, useAppSelector } from "app/store/store"
import { selectRecommendSearch } from "../model/recommend-search-selectors"
import { setFocusElement } from "../model/recommend-search-slice"
import { useSearch } from "features/search/hooks/use-search"
import { useEffect } from "react"

export const useFocusElement = (): [null | number, (increment: boolean) => void] => {
    const [, setSearch] = useSearch()
    const dispatch = useAppDispatch()
    const {focusElement, titles} = useAppSelector(selectRecommendSearch)
    const allTitles = titles.slice(0, 9)

    const calcFocusElement = (increment: boolean) => {
        if (increment) {
            if (focusElement === null || focusElement + 1 === allTitles.length){
                dispatch(setFocusElement(0)) // 0
            }
            else{
                dispatch(setFocusElement(focusElement+1)) // focusElememt+1
            }
        }
        else {
            if (focusElement !== null && focusElement - 1 < 0){
                dispatch(setFocusElement(allTitles.length-1))
            }
            else if (focusElement){
                dispatch(setFocusElement(focusElement - 1))
            }
        }
    }

    useEffect(() => {
        if (focusElement !== null)
        setSearch(allTitles[focusElement].text)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focusElement])

    return [focusElement, calcFocusElement]
}
