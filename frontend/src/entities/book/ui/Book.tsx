import { IBook } from "shared/types/book"
import styles from "./styles.module.scss";
import { CSSProperties, ReactNode, useState } from "react";

export interface BooKProps extends Pick<IBook, "author" | "title" | "image_link">  {
    children?: ReactNode,
    style?: CSSProperties,
}

export const Book = ({author, title, image_link, children, ...otherProps}: BooKProps ) => {
    const [error, setError] = useState(false)

    return <div {...otherProps} className={styles.book}>
        {children}
        <div className={styles.container}>
            <img className={styles.img} onError={() => setError(true)} src={!error ?"https://www.podpisnie.ru/" + image_link : "https://www.podpisnie.ru/upload/no-image.png"}  alt={title}/>
        </div>
        <div className={styles.info}>
            <span className={styles.title}>{title.length > 19 ? title.slice(0,20) + "...": title}</span>
            <span className={styles.author}>{author}</span>
        </div>
    </div>
}
