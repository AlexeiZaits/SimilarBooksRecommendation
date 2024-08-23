import { Book } from "entities/index"
import { Like } from "features/index"
import styles from "./styles.module.scss"
import { useLikeList } from "../hooks/use-like-list"
import { useSetLikeList } from "../hooks/use-set-like-list"
import { useEffect } from "react"

export const LikeList = () => {
    const [books, ] = useLikeList()
    const setLikeList = useSetLikeList()

    useEffect(() => {
        const localBooks = JSON.parse(localStorage.getItem("likesBook") || "[]" );
        if (books.length === 0 && localBooks.length !== 0) {
            console.log("localBook get")
            setLikeList(localBooks)
        }
    }, [])

    return <div className={styles.container}>
        <div className={styles.books}>
            {books.length !== 0 && books.map((item) => {
                return <Book style={{marginLeft: "3rem"}} key={item.uid} {...item}  children={<Like {...item}/>}/>
            })}
        </div>
    </div>
}
