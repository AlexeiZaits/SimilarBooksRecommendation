import { useEffect, useState } from "react"
import styles from "./styles.module.scss";
import { LikeImg } from "shared/assets/icons/LikeImg";
import { IBook } from "shared/types/book";
import { useLikeList } from "features/likeList/hooks/use-like-list";

export const Like = (props: IBook) => {
    const [like, setLike] = useState(false)
    const [, toggleBook] = useLikeList()

    const handleClick = () => {
        toggleBook({book: props, like: like})
        setLike((prevState) => !prevState)
    }

    useEffect(() => {
        const books = JSON.parse(localStorage.getItem("likesBook") || "[]" )
        const isLike = books.findIndex((item: IBook) => item.uid === props.uid)

        if (isLike !==-1 && !like){
            setLike(true)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return <div className={styles.like} onClick={handleClick}>
        <LikeImg like={like}/>
    </div>
}
