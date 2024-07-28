import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import { Button, Input } from "shared/ui"
import styles from "./styles.module.scss";
import { useRecommendList } from "../../recommendList/hooks/use-recommend-list";
import { LupaImg } from "shared/assets/icons/lupa";
import { ClearImg } from "shared/assets/icons/ClearImg";
import { useSearch } from "../hooks/use-search";
import { useClearSearch } from "../hooks/use-search-clear";
import { smoothScrollHigh } from "../lib/smoothScrollHigh";
import { useClearInfinityScroll } from "features/infinityScroll/hooks/use-clear-infinity-scroll";

export const SearchRecommend = () => {
    const [search, setSearch] = useSearch()
    const clearSearch = useClearSearch()
    const clearInfinityScroll = useClearInfinityScroll()
    const [{error}, searchBooks] = useRecommendList()
    const [placeholder, setPlaceholder] = useState("Enter request")

    useEffect(() => {
        if (error) {
            setPlaceholder(error);
            clearSearch()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    const handleClick = () => {
        smoothScrollHigh()
        clearInfinityScroll()
        searchBooks({
                "description": search,
                "limit": 24,
                "offset": 0,
                "collection_name": "SimilarBooksService"
        })
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter"){
            clearInfinityScroll()
            smoothScrollHigh()
            searchBooks({
                "description": search,
                "limit": 24,
                "offset": 0,
                "collection_name": "SimilarBooksService"
            })
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleClear = () => {
        clearSearch()
    }

    return <div onKeyDown={handleKeyDown} className={styles.container}>
        <div className={styles.search}>
            <Input secondary={true} placeholder={placeholder} value={search} onChange={handleChange}/>
            <div onClick={handleClear} className={styles.clear}><ClearImg/></div>
        </div>
        <Button onClick={handleClick} svg={<LupaImg/>} secondary={true}/>
    </div>
}
