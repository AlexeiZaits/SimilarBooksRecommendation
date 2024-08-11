import { useAppSelector } from "app/store/store"
import { selectAllTitles } from "../model/recommend-search-selectors"

export const useGetTitle = () => {
    const titles = useAppSelector(selectAllTitles)

    const getTitle = (index: number) => titles[index]

    return getTitle
}
