import { IBook } from "shared/types/book"
import styles from "./styles.module.scss";
import img from "../../../shared/assets/icons/54300.jpg"

export const Book = ({author, title}: Pick<IBook, "author" | "title"> ) => {
    return <div className={styles.book}>
        <div className={styles.container}><img className={styles.img} src={img} alt="img"/></div>
        <div className={styles.info}>
            <span className={styles.author}>{author}</span>
            <span className={styles.title}>{title}</span>
        </div>
    </div>
}