import { IBook } from "shared/types/book"
import styles from "./styles.module.scss";
import { CSSProperties, ReactNode} from "react";
import { Link } from "react-router-dom";
import { fixLink } from "../lib/fixLink";
import { ImgWithSkeleton } from "shared/ui";
import { fixNavigateLink } from "widjets/sidebar";

export interface BooKProps extends Pick<IBook, "author" | "title" | "image_link">  {
    children?: ReactNode,
    style?: CSSProperties,
}


export const Book = ({author, title, image_link, children, ...otherProps}: BooKProps ) => {
    const link = `/book/${fixNavigateLink(title)}`;

    return <div {...otherProps} className={styles.book}>
        {children}
        <Link to={link} className={styles.container}>
            <ImgWithSkeleton errorLink={"https://www.podpisnie.ru/upload/no-image.png"}
            link={"https://www.podpisnie.ru/" + fixLink(image_link)}
            width={240} height={448}
            title={title}/>
        </Link>
        <Link to={link} className={styles.info}>
            <span className={styles.title}>{title.length > 19 ? title.slice(0,20) + "...": title}</span>
            <span className={styles.author}>{author}</span>
        </Link>
    </div>
}
