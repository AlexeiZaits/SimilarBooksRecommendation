import { useAppDispatch } from "app/store/store"
import { setBooksLike } from "../modal/like-list-slice"
import { IBook } from "shared/types/book"

export const useSetLikeList = () => {
    const dispatch = useAppDispatch()
    const setList = (books: IBook[]) => dispatch(setBooksLike(books))

    return setList
}
