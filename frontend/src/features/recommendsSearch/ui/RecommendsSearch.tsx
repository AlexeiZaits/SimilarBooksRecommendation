import { useSearchRecommend } from "../hooks/use-recommend-search"
import { useRecommendList } from "features/recommendList/hooks/use-recommend-list"
import { useSearch } from "features/search/hooks/use-search"
import styles from "./styles.module.scss"
import classNames from "classnames"
import { useFocusElement } from "../hooks/use-focus-element"
import { useClearFocusRecommends } from "../hooks/use-clear-focus-recommend.ts"
import { useEffect } from "react"
import { useSetTitles } from "../hooks/use-set-titles.ts"
import { setLocalTitle } from "../lib/setLocalTitle.ts"
import { useNavigate } from "react-router-dom"

export const RecommendListSearch = () => {
    const [{titles, qty}, searchRecommend] = useSearchRecommend()
    const [, searchBooks] = useRecommendList()
    const [, setSearch] = useSearch()
    const [focusedIndex] = useFocusElement()
    const clearFocus = useClearFocusRecommends()
    const setTitles = useSetTitles()
    const navigate = useNavigate();

    useEffect(() => {
        (qty === 0 && localStorage.getItem("recommends")) && setTitles(JSON.parse(localStorage.getItem("recommends") || "[]").slice(0,9))

    }, [qty, setTitles])

    const handleClick = (title : string) => {
        searchRecommend(title)
        navigate("")
        searchBooks({
            query: title,
            limit: 24,
            offset: 0,
        })
        setSearch(title)
        setLocalTitle(title)
        clearFocus()
    }

    return <>
        {qty !== 0 &&  titles.map((item, index) => {
            return <div key={index}

            onMouseDown={() => handleClick(item)}
            className={classNames(
                styles.container,
                {[styles.active]: index === focusedIndex},
            )}>
                <p>{item.length > 40 ? item.slice(0,45) + "...": item}</p>
            </div>
        })}
    </>
}
