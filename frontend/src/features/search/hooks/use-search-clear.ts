import { useAppDispatch } from "app/store/store"
import { clearSearch } from "../model/search-slice"

export const useClearSearch = () => {
    const dispatch = useAppDispatch()

    const clear = () => dispatch(clearSearch())

    return clear
}
