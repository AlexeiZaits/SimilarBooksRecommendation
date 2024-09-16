import { useAppDispatch } from "app/store/store"
import { actionFindMore, IActioFindMore } from "../model/recommend-list-actions"

export const useFindMoreRecommend = () => {
    const dispatch = useAppDispatch()

    const findMoreBooks = (requestBooks: IActioFindMore) => dispatch(actionFindMore(requestBooks))

    return findMoreBooks
}
