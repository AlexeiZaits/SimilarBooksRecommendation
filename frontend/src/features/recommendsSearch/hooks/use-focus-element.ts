import { useAppDispatch, useAppSelector } from "app/store/store"
import { selectRecommendSearch } from "../model/recommend-search-selectors"
import { decrementFocusElement, incrementFocusElement } from "../model/recommend-search-slice"
import { useSearch } from "features/search/hooks/use-search"
import { useEffect } from "react"

export const useFocusElement = (): [null | number, (increment: boolean) => void] => {
    const [, setSearch] = useSearch()
    const dispatch = useAppDispatch()
    const {focusElement, titles} = useAppSelector(selectRecommendSearch)

    const calcFocusElement = (increment: boolean) => increment ? dispatch(incrementFocusElement()) : dispatch(decrementFocusElement())

    useEffect(() => {
        if (focusElement !== null)
        setSearch(titles[focusElement])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focusElement])

    return [focusElement, calcFocusElement]
}
