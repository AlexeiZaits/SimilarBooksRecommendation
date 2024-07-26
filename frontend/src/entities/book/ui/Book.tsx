import { IBook } from "shared/types/book"
import styles from "./styles.module.scss";
import { imgBook } from "../lib/imgBase64";
import { CSSProperties, ReactNode } from "react";

export interface BooKProps extends Pick<IBook, "author" | "title">  {
    children?: ReactNode,
    style?: CSSProperties,
}

export const Book = ({author, title, children, ...otherProps}: BooKProps ) => {
    return <div {...otherProps} className={styles.book}>
        {children}
        <div className={styles.container}><img className={styles.img} src={`data:image/jpeg;base64,${imgBook}`} alt="img"/></div>
        <div className={styles.info}>
            <span className={styles.title}>{title}</span>
            <span className={styles.author}>{author}</span>
        </div>
    </div>
}