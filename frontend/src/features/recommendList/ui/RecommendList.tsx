import { PreloaderModal } from "shared/ui/preloaderModal/ui/Preloader"
import { useRecommendList } from "../hook/use-recommend-list"
import { Book } from "entities/index"
import styles from "./styles.module.scss";
import { useRef } from "react";
import { Like } from "features/like/ui/Like";

export const RecommendList = () => {
    const [{status, books},] = useRecommendList()
    // const [maxScroll, setMaxScroll] = useState(0)
    const booksRef = useRef<HTMLDivElement>(null)
    // const [toggle, setToggle] = useState(false)

    // useEffect(() => {
    //     if (booksRef !== null && booksRef.current)
    //     setMaxScroll(booksRef.current.scrollHeight-booksRef.current.clientHeight)
    // }, [booksRef])

    // const handleScroll = (e) => {
    //     if (e.currentTarget.scrollTop+100 > maxScroll) {
    //         setToggle(true)
    //         if (booksRef !== null && booksRef.current) setMaxScroll(booksRef.current.scrollHeight-booksRef.current.clientHeight)
    //     }
    // }

    return <div className={styles.container}>
        {status === "loading" && <PreloaderModal/>}

        {/* //onScroll={handleScroll} */}
        <div ref={booksRef} className={styles.books}>
            {status === "received" && books.map((item, index) => {
                return <Book style={{marginLeft: "3rem"}} key={index} {...item}  children={<Like id={index}/>}/>
            })}
        </div>
    </div>
}
