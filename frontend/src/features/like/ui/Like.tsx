import { LikeImg } from "shared/assets/icons/LikeImg";
import { IBook } from "shared/types/book";
import styles from "./styles.module.scss";
import { useLike } from "../hooks/use-like";

export const Like = (props: IBook) => {
    const [handleClick, like] = useLike(props)


    return <div className={styles.like} onClick={handleClick}>
        <LikeImg like={like}/>
    </div>
}
