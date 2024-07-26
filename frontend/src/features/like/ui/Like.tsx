import { useEffect, useState } from "react"
import styles from "./styles.module.scss";
import { LikeImg } from "shared/assets/icons/LikeImg";
import { IBook } from "shared/types/book";

export const Like = ({author, id, title, image}: Pick<IBook, "author" | "id" | "title" | "image">) => {
    const [like, setLike] = useState(false)

    useEffect(()=> {
        like ? localStorage.setItem(`book?${id}`, JSON.stringify({author: author, title:title, image:image})) : localStorage.removeItem(`book?${id}`)
    }, [like])
    
    return <div className={styles.like} onClick={() => setLike((prevState) => !prevState)}>
        <LikeImg like={like}/>
    </div>
}