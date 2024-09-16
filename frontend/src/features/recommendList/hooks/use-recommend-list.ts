import { useAppDispatch, useAppSelector } from "app/store/store"
import { selectRecommendList } from "../model/recommend-list-selectors"
import { actionGetBooks, actionSearchBooks } from "../model/recommend-list-actions"
import { BooksRequest } from "shared/types/request"
import { useSearchParams } from "react-router-dom"

type SearchOrGet = "search" | "get"

export const useRecommendList = (): [
    ReturnType<typeof selectRecommendList>,
    (search: BooksRequest, searchOrGet: SearchOrGet) => void
] =>
{
    const dispatch = useAppDispatch()
    const [, setSearchParams] = useSearchParams()
    const booksInfo = useAppSelector(selectRecommendList)

    const searchBooks = (searchRequest: BooksRequest, searchOrGet: SearchOrGet) => {
        console.log(searchOrGet)
        if (searchOrGet === "search"){
            setSearchParams({search: searchRequest.query})
            dispatch(actionSearchBooks(searchRequest))
        } else {
            dispatch(actionGetBooks(searchRequest))
        }
    }


    return [{...booksInfo}, searchBooks]
}
