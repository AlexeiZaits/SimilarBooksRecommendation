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
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const currentMaxScroll = documentHeight - windowHeight;

            console.log(scrollTop, currentMaxScroll);
            if (scrollTop + 100 > currentMaxScroll) {
                console.log("Near bottom of document");
                setMaxScroll(currentMaxScroll);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return <div  className={styles.container}>
        {status === "loading" && <PreloaderModal/>}

        <div  ref={booksRef} className={styles.books}>
            {qty !== 0 && books.map((item) => {
                return <Book style={{marginLeft: "3rem"}} key={item.uid} {...item}  children={<Like id={item.uid}/>}/>
            })}
        </div>
    </div>
}
