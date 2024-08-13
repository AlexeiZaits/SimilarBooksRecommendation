import { useAppDispatch, useAppSelector } from "app/store/store"
import { selectRecommendList } from "../model/recommend-list-selectors"
import { actionSearchBooks } from "../model/recommend-list-actions"
import { BooksRequest } from "shared/types/request"
import { useSearchParams } from "react-router-dom"

export const useRecommendList = (): [
    ReturnType<typeof selectRecommendList>,
    (search: BooksRequest) => void
] =>
{
    const dispatch = useAppDispatch()
    const [, setSearchParams] = useSearchParams()
    const booksInfo = useAppSelector(selectRecommendList)

    const searchBooks = (searchRequest: BooksRequest) => {
        setSearchParams({search: searchRequest.query})
        dispatch(actionSearchBooks(searchRequest))
    }


    return [{...booksInfo}, searchBooks]
}
