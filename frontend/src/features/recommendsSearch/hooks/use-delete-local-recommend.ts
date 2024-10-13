import { useAppDispatch } from "app/store/store"
import { deleteTitleLocalRecommend, titlesRecommend } from "../model/recommend-search-slice"

export const useDeleteLocalRecommend = () => {
    const dispatch = useAppDispatch()

    const deleteRecommend = (title : titlesRecommend) => dispatch(deleteTitleLocalRecommend(title))

    return deleteRecommend
}
