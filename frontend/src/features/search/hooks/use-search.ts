import { useAppDispatch, useAppSelector } from "app/store/store"
import { setDebounceSearch, setSearch } from "../model/search-slice"

export const useSearch = (): [string, (search: string, key?: "debounce") => void ] => {
    const dispatch = useAppDispatch()
    const {search} = useAppSelector(state => state.searchRecommend)

    const setSearchRecommend = (search: string, key?: "debounce") =>  !key ? dispatch(setSearch(search)): dispatch(setDebounceSearch(search))

    return [search, setSearchRecommend]
}
