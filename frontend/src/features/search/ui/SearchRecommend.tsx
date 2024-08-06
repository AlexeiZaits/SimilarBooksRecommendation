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
import { useSearchRecommend } from "features/recommendsSearch/hooks/use-recommend-search";
import { useClearReommendSearch } from "features/recommendsSearch/hooks/use-clear-recommend-search";
import { useFocusRecommendSearch } from "features/recommendsSearch/hooks/use-focus-recommend-search";

export const SearchRecommend = () => {
    const [search, setSearch] = useSearch()
    const clearSearch = useClearSearch()
    const clearInfinityScroll = useClearInfinityScroll()
    const [{error}, searchBooks] = useRecommendList()
    const [placeholder, setPlaceholder] = useState("Введите запрос")
    const [, searchRecommend] = useSearchRecommend()
    const clearRecommendList = useClearReommendSearch()
    const [, setFocus] = useFocusRecommendSearch()

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
                query: search,
                limit: 24,
                offset: 0,
        })
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {

        if(event.key === "ArrowDown"){
            event.preventDefault()
            console.log("arrowDown")
            setFocus(true)
        }
        if (event.key === "Enter"){
            smoothScrollHigh()
            clearInfinityScroll()
            searchBooks({
                query: search,
                limit: 24,
                offset: 0,
            })
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        e.target.value.length > 0 && searchRecommend({
            query: e.target.value,
            limit: 9,
            offset: 0,
        })
    }

    const handleClear = () => {
        clearSearch()
        clearRecommendList()
    }

    return <div onKeyDown={handleKeyDown} className={styles.container}>
        <div className={styles.search}>
            <Input secondary={true} placeholder={placeholder} value={search} onChange={handleChange}/>
            <div onClick={handleClear} className={styles.clear}><ClearImg/></div>
        </div>
        <Button onClick={handleClick} svg={<LupaImg/>} secondary={true}/>
    </div>
}
