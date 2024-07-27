import { useEffect, useState } from "react"
import styles from "./styles.module.scss";
import { LikeImg } from "shared/assets/icons/LikeImg";
import { IBook } from "shared/types/book";

export const Like = ({ id }: Pick<IBook, "id">) => {
    const [like, setLike] = useState(false)

    useEffect(()=> {
        like ? localStorage.setItem(`book?${id}`, JSON.stringify({id: id})) : localStorage.removeItem(`book?${id}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [like])

    return <div className={styles.like} onClick={() => setLike((prevState) => !prevState)}>
        <LikeImg like={like}/>
    </div>
}
