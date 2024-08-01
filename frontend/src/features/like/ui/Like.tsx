import { useState } from "react"
import styles from "./styles.module.scss";
import { LikeImg } from "shared/assets/icons/LikeImg";
import { IBook } from "shared/types/book";
import { useLikeLocal } from "../hooks/use-like-local";

export const Like = ({ uid }: Pick<IBook, "uid">) => {
    const [like, setLike] = useState(false)

    useLikeLocal({like: like, uid: uid})

    return <div className={styles.like} onClick={() => setLike((prevState) => !prevState)}>
        <LikeImg like={like}/>
    </div>
}
