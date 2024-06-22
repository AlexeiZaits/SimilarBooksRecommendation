import { useState } from "react"
import { Button, Input } from "shared/ui"
import styles from "./styles.module.scss";
import { useRecommendList } from "../hook/use-recommend-list";

export const SearchRecommend = () => {
    const [search, setSearch] = useState("")
    const [, searchBooks] = useRecommendList()
    
    // useEffect(() => {
    //     fetch(search)
    // }, [search])

    const handleClick = () => {
        searchBooks(search)
    }
    
    return <div className={styles.search}>
        <Input placeholder="Война и мир" value={search} onChange={(event) => setSearch(event.target.value)}/>
        <Button onClick={handleClick} style={{width: "10rem", marginLeft: "1rem"}}>Search</Button>
    </div>
}