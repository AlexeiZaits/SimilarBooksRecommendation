import { useEffect, useState } from "react"
import { Button, Input } from "shared/ui"
import styles from "./styles.module.scss";
import { useRecommendList } from "../../recommendList/hook/use-recommend-list";
import { LupaImg } from "shared/assets/icons/lupa";

export const SearchRecommend = () => {
    const [search, setSearch] = useState("")
    const [{error}, searchBooks] = useRecommendList()
    const [placeholder, setPlaceholder] = useState("Enter request")
    
    useEffect(() => {
        if (error) {setPlaceholder(error); setSearch("")}
    }, [error])
    
    const handleClick = () => {
        searchBooks(search)
    }
    
    return <div className={styles.search}>
        <Input secondary={true} placeholder={placeholder} value={search} onChange={(event) => setSearch(event.target.value)}/>
        <Button onClick={handleClick} svg={<LupaImg/>} secondary={true}/>
    </div>
}