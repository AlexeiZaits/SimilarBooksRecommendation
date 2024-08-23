import { useAppDispatch, useAppSelector } from "app/store/store"
import { selectAllLikeBooks } from "../modal/like-list-selectors"
import { IBook } from "shared/types/book"
import { toggleBookLike } from "../modal/like-list-slice"

interface ISetLikeList {
    book: IBook,
    like: boolean
}

export const useLikeList = (): [IBook[], ({book, like}: ISetLikeList) => void] => {
    const dispatch = useAppDispatch()
    const likeList = useAppSelector(selectAllLikeBooks)

    const toggleBook = ({book, like}: ISetLikeList) => {dispatch(toggleBookLike({book: book, like: like}))}

    return [likeList, toggleBook]

}
