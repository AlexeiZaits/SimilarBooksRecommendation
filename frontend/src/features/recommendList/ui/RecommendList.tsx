import { PreloaderModal } from "shared/ui/preloaderModal/ui/Preloader"
import { useRecommendList } from "../hook/use-recommend-list"
import { Book } from "entities/index"
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import { Like } from "features/like/ui/Like";
import { imgBook } from "entities/book/lib/imgBase64";

export const RecommendList = () => {
    const [{status},] = useRecommendList()
    const [maxScroll, setMaxScroll] = useState(0)
    const booksRef = useRef<HTMLDivElement>(null)
    const [toggle, setToggle] = useState(false)
    
    useEffect(() => {
        if (booksRef !== null && booksRef.current)
        setMaxScroll(booksRef.current.scrollHeight-booksRef.current.clientHeight)
    }, [booksRef])
    
    const handleScroll = (e) => {
        if (e.currentTarget.scrollTop+100 > maxScroll) {
            setToggle(true)
            if (booksRef !== null && booksRef.current) setMaxScroll(booksRef.current.scrollHeight-booksRef.current.clientHeight)
        }
    }

    console.log(maxScroll)
    return <div className={styles.container}>
        {status === "loading" && <PreloaderModal/>}
        {/* {qty && books.map((item) => {
            return <Book {...item}/>
        })} */}
        
        <div onScroll={handleScroll} ref={booksRef} className={styles.books}>
            <Book style={{marginLeft: "3rem"}} author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL"><Like author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL" id={1} image={imgBook}/></Book>
           <Book style={{marginLeft: "3rem"}} author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL"><Like author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL" id={2} image={imgBook}/></Book>
           <Book style={{marginLeft: "3rem"}} author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL"><Like author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL" id={3} image={imgBook}/></Book>
           <Book style={{marginLeft: "3rem"}} author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL"><Like author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL" id={4} image={imgBook}/></Book>
           <Book style={{marginLeft: "3rem"}} author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL"><Like author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL" id={5} image={imgBook}/></Book>
           <Book style={{marginLeft: "3rem"}} author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL"><Like author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL" id={6} image={imgBook}/></Book>
           <Book style={{marginLeft: "3rem"}} author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL"><Like author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL" id={7} image={imgBook}/></Book>
           <Book style={{marginLeft: "3rem"}} author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL"><Like author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL" id={8} image={imgBook}/></Book>
            {toggle && <Book author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL"/>}
        </div>
    </div>
}
