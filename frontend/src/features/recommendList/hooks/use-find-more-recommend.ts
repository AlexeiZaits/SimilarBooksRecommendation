import { useAppDispatch } from "app/store/store"
import { BooksRequest } from "shared/types/request"
import { actionFindMore } from "../model/recommend-list-actions"

export const useFindMoreRecommend = () => {
    const dispatch = useAppDispatch()

    const findMoreBooks = (requestBooks: BooksRequest) => dispatch(actionFindMore(requestBooks))

    return findMoreBooks
}
