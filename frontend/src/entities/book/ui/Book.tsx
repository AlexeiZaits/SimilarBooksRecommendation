import { IBook } from "shared/types/book"
import styles from "./styles.module.scss";
import { CSSProperties, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

export interface BooKProps extends Pick<IBook, "author" | "title" | "image_link">  {
    children?: ReactNode,
    style?: CSSProperties,
}

export const Book = ({author, title, image_link, children, ...otherProps}: BooKProps ) => {
    const [error, setError] = useState(false)
    const [load, setLoad] = useState(false)

    const fixLink = (link: string) => {
        const newLink = link.split("/")
        newLink[5] = "1263_576_1"
        return newLink.join("/")
    }


    return <div {...otherProps} className={styles.book}>
        {children}
        <Link to={`book/${title}`} className={styles.container}>
            <img className={styles.img} style={{display: load ? "block" : "none"}} onLoad={() => setLoad(true)} onError={() => setError(true)} src={!error ? "https://www.podpisnie.ru/" + fixLink(image_link) : "https://www.podpisnie.ru/upload/no-image.png"}  alt={title}/>
            {!load && <Skeleton sx={{ bgcolor: 'grey.400' }} variant="rectangular" width={240} height={448} />}
        </Link>
        <div className={styles.info}>
            <span className={styles.title}>{title.length > 19 ? title.slice(0,20) + "...": title}</span>
            <span className={styles.author}>{author}</span>
        </div>
    </div>
}
