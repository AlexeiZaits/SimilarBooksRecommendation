import { useAppDispatch, useAppSelector } from "app/store/store"
import { selectRecommendList } from "../model/recommend-list-selectors"
import { actionSearchBooks } from "../model/recommend-list-actions"
import { BooksRequest } from "shared/types/request"


export const useRecommendList = (): [
    ReturnType<typeof selectRecommendList>,
    (search: BooksRequest) => void
] =>
{
    const dispatch = useAppDispatch()

    const booksInfo = useAppSelector(selectRecommendList)
    const searchBooks = (searchRequest: BooksRequest) => dispatch(actionSearchBooks(searchRequest))

    return [{...booksInfo}, searchBooks]
}
