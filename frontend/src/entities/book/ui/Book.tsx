import { IBook } from "shared/types/book"
import styles from "./styles.module.scss";
import { CSSProperties, ReactNode } from "react";

export interface BooKProps extends Pick<IBook, "author" | "title" | "image_link">  {
    children?: ReactNode,
    style?: CSSProperties,
}

export const Book = ({author, title, image_link, children, ...otherProps}: BooKProps ) => {

    return <div {...otherProps} className={styles.book}>
        {children}
        <div className={styles.container}>
            <img className={styles.img} src={"https://www.podpisnie.ru/" + image_link} alt="img"/>
        </div>
        <div className={styles.info}>
            <span className={styles.title}>{title.length > 19 ? title.slice(0,20) + "...": title}</span>
            <span className={styles.author}>{author}</span>
        </div>
    </div>
}
