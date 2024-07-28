import { useAppDispatch, useAppSelector } from "app/store/store"
import { setSearch } from "../model/search-slice"

export const useSearch = (): [string, (search: string) => void ] => {
    const dispatch = useAppDispatch()
    const {search} = useAppSelector(state => state.searchRecommend)

    const setSearchRecommend = (search: string) => dispatch(setSearch(search))

    return [search, setSearchRecommend]
}
