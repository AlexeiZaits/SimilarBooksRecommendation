import { IBook } from "shared/types/book"
import styles from "./styles.module.scss";
import { CSSProperties, ReactNode} from "react";
import { Link } from "react-router-dom";
import { fixLink } from "../lib/fixLink";
import { ImgWithSkeleton } from "shared/ui";

export interface BooKProps extends Pick<IBook, "author" | "title" | "image_link">  {
    children?: ReactNode,
    style?: CSSProperties,
}


export const Book = ({author, title, image_link, children, ...otherProps}: BooKProps ) => {

    return <div {...otherProps} className={styles.book}>
        {children}
        <Link to={`/book/${title}`} className={styles.container}>
            <ImgWithSkeleton errorLink={"https://www.podpisnie.ru/upload/no-image.png"}
            link={"https://www.podpisnie.ru/" + fixLink(image_link)}
            width={240} height={448}
            title={title}/>
        </Link>
        <div className={styles.info}>
            <span className={styles.title}>{title.length > 19 ? title.slice(0,20) + "...": title}</span>
            <span className={styles.author}>{author}</span>
        </div>
    </div>
}
