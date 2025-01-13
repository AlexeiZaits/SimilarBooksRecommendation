import { LikeImg } from "shared/assets/icons/LikeImg";
import styles from "./styles.module.scss";
import { useLike } from "../hooks/use-like";

export const Like = (props) => {
    const [handleClick, like] = useLike(props)


    return <div className={styles.like} onClick={handleClick}>
        <LikeImg like={like}/>
    </div>
}
