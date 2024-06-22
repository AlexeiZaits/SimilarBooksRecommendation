import { useAppDispatch, useAppSelector } from "app/store/store"
import { selectRecommendList } from "../model/recommend-list-selectors"
import { actionSearchBooks } from "../model/recommend-list-actions"


export const useRecommendList = (): [
    ReturnType<typeof selectRecommendList>,
    (search: string) => void
] => 
{   
    const dispatch = useAppDispatch()

    const booksInfo = useAppSelector(selectRecommendList)
    const searchBooks = (search: string) => dispatch(actionSearchBooks(search))
    
    return [{...booksInfo}, searchBooks]
}