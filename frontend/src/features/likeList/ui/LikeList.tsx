import { Book } from "entities/index"
import { Like } from "features/index"
import styles from "./styles.module.scss"
import { useLikeList } from "../hooks/use-like-list"

export const LikeList = () => {
    const [books, ] = useLikeList()


    return <div className={styles.container}>
        <div className={styles.books}>
            {books.length !== 0 && books.map((item) => {
                return <Book style={{marginLeft: "3rem"}} key={item.uid} {...item}  children={<Like {...item}/>}/>
            })}
        </div>
    </div>
}
