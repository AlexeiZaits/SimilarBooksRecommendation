import { PreloaderModal } from "shared/ui/preloaderModal/ui/Preloader"
import { useRecommendList } from "../hook/use-recommend-list"
import { Book } from "entities/index"
import styles from "./styles.module.scss";
import { UIEvent, useEffect, useRef, useState } from "react";
import { Like } from "features/like/ui/Like";

export const RecommendList = () => {
    const [{status, books, qty},] = useRecommendList()
    const [maxScroll, setMaxScroll] = useState(0)
    const booksRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        if (booksRef !== null && booksRef.current)
        setMaxScroll(booksRef.current.scrollHeight-booksRef.current.clientHeight)
    }, [booksRef])

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        console.log("scroll")
        if (e.currentTarget.scrollTop+100 > maxScroll) {
            if (booksRef !== null && booksRef.current) setMaxScroll(booksRef.current.scrollHeight-booksRef.current.clientHeight)
        }
    }

    return <div  className={styles.container}>
        {status === "loading" && <PreloaderModal/>}

        <div onScroll={handleScroll} ref={booksRef} className={styles.books}>
            {qty !== 0 && books.map((item) => {
                return <Book style={{marginLeft: "3rem"}} key={item.uid} {...item}  children={<Like id={item.uid}/>}/>
            })}
        </div>
    </div>
}
