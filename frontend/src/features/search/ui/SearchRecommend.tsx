import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
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
import useDebounce from "../hooks/use-debounce";
import { useFocusElement } from "features/recommendsSearch/hooks/use-focus-element";
import { useSetViewRecommendSearch } from "features/recommendsSearch/hooks/use-set-recommend-search";
import { useClearFocusRecommends } from "features/recommendsSearch/hooks/use-clear-focus-recommend.ts";
import { setLocalTitle } from "features/recommendsSearch/lib/setLocalTitle";

export const SearchRecommend = () => {
    const [viewHint, setViewHint] = useState(false)
    const [viewLupa, setViewLupa] = useState(false)
    const [placeholder, setPlaceholder] = useState("Введите запрос")
    const formRef = useRef<HTMLDivElement>(null)
    const clearSearch = useClearSearch()
    const clearInfinityScroll = useClearInfinityScroll()
    const clearFocus = useClearFocusRecommends()
    const clearRecommendList = useClearReommendSearch()
    const [search, setSearch] = useSearch()
    const [, searchRecommend] = useSearchRecommend()
    const [, setDebounceValue] = useDebounce(searchRecommend, 400)
    const [, calcFocus] = useFocusElement()
    const [, setView] = useSetViewRecommendSearch()
    const [{error}, searchBooks] = useRecommendList()

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
        searchRecommend(search)
        searchBooks({
                query: search,
                limit: 24,
                offset: 0,
        })
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault()
                calcFocus(true)
                break;
            case "ArrowUp":
                event.preventDefault();
                calcFocus(false)
                break;
            case "Enter":
                formRef.current && formRef.current.focus()
                smoothScrollHigh()
                clearInfinityScroll()
                searchBooks({
                    query: search,
                    limit: 24,
                    offset: 0,
                })
                searchRecommend(search)
                setLocalTitle(search)
                clearFocus()
                break;
            default:
                break;
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setDebounceValue(e.target.value)
        if (!e.target.value){
            clearRecommendList()
        }
        setView(true)
    }

    const handleClear = () => {
        clearSearch()
        clearRecommendList()
        setDebounceValue("")
        setView(false)
    }

    const handleFocus = () => {
        setViewLupa(true)
        setView(true)
    }

    const handleOnBlur = () => {
        setViewLupa(false)
        setView(false)
    }

    return <div ref={formRef} tabIndex={0} onKeyDown={handleKeyDown} className={styles.container}>
        <div  className={styles.search}>
            {viewLupa && <i className={styles.icon}><LupaImg size="18px"/></i>}
            <Input error={error === null ? false: true} secondary={true} onBlur={handleOnBlur} placeholder={placeholder} value={search} onChange={handleChange} onFocus={handleFocus}/>
            {search.length !== 0 && <div onClick={handleClear} className={styles.clear}><ClearImg/></div>}
        </div>
        <div style={{position: "relative"}}>
            <Button onMouseLeave={() => setViewHint(false)} onMouseEnter={() => setViewHint(true)} onClick={handleClick} svg={<LupaImg/>} secondary={true}/>
            {viewHint && <div className={styles.hint}>
                <p>Введите запрос</p>
            </div>}
        </div>
    </div>
}
