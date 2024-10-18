import { useLikeList } from "features/likeList/hooks/use-like-list";
import { useEffect, useState } from "react";
import { IBook } from "shared/types";

export const useLike = (item: IBook): [() => void, boolean] => {
    const [like, setLike] = useState(false)
    const [, toggleBook] = useLikeList()

    const handleClick = () => {
        toggleBook({book: item, like: like})
        setLike((prevState) => !prevState)
    }

    useEffect(() => {
        const books = JSON.parse(localStorage.getItem("likesBook") || "[]" )
        const isLike = books.findIndex((itemBook: IBook) => itemBook.uid === item.uid)

        if (isLike !==-1 && !like){
            setLike(true)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [handleClick, like]
}
