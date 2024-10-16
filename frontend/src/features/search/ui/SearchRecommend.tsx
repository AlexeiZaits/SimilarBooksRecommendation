import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { Button, Input } from "shared/ui"
import styles from "./styles.module.scss";
import { useRecommendList } from "../../recommendList/hooks/use-recommend-list";
import { LupaImg } from "shared/assets/icons/lupa";
import { useSearch } from "../hooks/use-search";
import { useClearSearch } from "../hooks/use-search-clear";
import { smoothScrollHigh } from "../lib/smoothScrollHigh";
import { useClearInfinityScroll } from "features/infinityScroll/hooks/use-clear-infinity-scroll";
import { useSearchRecommend } from "features/recommendsSearch/hooks/use-recommend-search";
import { useClearReommendSearch } from "features/recommendsSearch/hooks/use-clear-recommend-search";
import useDebounce from "../hooks/use-debounce";
import { useFocusElement } from "features/recommendsSearch/hooks/use-focus-element";
import { useSetViewRecommendSearch } from "features/recommendsSearch/hooks/use-set-view-recommend-search";
import { useClearFocusRecommends } from "features/recommendsSearch/hooks/use-clear-focus-recommend.ts";
import { setLocalTitle } from "features/recommendsSearch/lib/setLocalTitle";
import { useNavigate } from "react-router-dom";
import { getThemeColor } from "shared/lib/getThemeColor";
import { IoClose } from "react-icons/io5";
import { usePlaceholder } from "../hooks/use-placeholder";
import useWindowSize from "widjets/carusel/hooks/useWindowSize";

export const SearchRecommend = () => {
    const [viewHint, setViewHint] = useState(false)
    const [viewLupa, setViewLupa] = useState(false)
    const formRef = useRef<HTMLDivElement>(null)
    const clearSearch = useClearSearch()
    const clearInfinityScroll = useClearInfinityScroll()
    const clearFocus = useClearFocusRecommends()
    const clearRecommendList = useClearReommendSearch()
    const [search, setSearch] = useSearch()
    const [, searchRecommend] = useSearchRecommend()
    const [debounceValue, setDebounceValue] = useDebounce(searchRecommend, 400)
    const [, calcFocus] = useFocusElement()
    const [, setView] = useSetViewRecommendSearch()
    const [{error}, searchBooks] = useRecommendList()
    const navigate = useNavigate();
    const [placeholder, ] = usePlaceholder(clearSearch, error)
    const windowSize = useWindowSize()

    const handleClick = () => {
        navigate("")
        smoothScrollHigh()
        clearInfinityScroll()
        searchRecommend(search)
        searchBooks({
                query: search,
                limit: 24,
                offset: 0,
        }, "search")
    }

    useEffect(() => {
        setSearch(debounceValue, "debounce")
    }, [debounceValue])


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
                navigate("")
                smoothScrollHigh()
                clearInfinityScroll()
                searchBooks({
                    query: search,
                    limit: 24,
                    offset: 0,
                }, "search")
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
            {viewLupa && <i className={styles.icon}>
                <LupaImg color={getThemeColor()} size={windowSize > 1024 ? "18px": "15px"}/>
            </i>}
            <Input error={error === null ? false: true} secondary={true} onBlur={handleOnBlur} placeholder={placeholder} value={search} onChange={handleChange} onFocus={handleFocus}/>
            {search.length !== 0 && viewLupa && <div onMouseDown={handleClear} className={styles.clear}>
                <IoClose size={30} color={getThemeColor()}/>
            </div>}
        </div>
        <div style={{position: "relative"}}>
            <Button onMouseLeave={() => setViewHint(false)} onMouseEnter={() => setViewHint(true)} onClick={handleClick} svg={<LupaImg size={windowSize > 1024 ? "24px": "20px"}/>} secondary={true}/>
            {viewHint && <div className={styles.hint}>
                <p>Введите запрос</p>
            </div>}
        </div>
    </div>
}
