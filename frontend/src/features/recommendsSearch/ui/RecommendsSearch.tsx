import { useSearchRecommend } from "../hooks/use-recommend-search"
import { useRecommendList } from "features/recommendList/hooks/use-recommend-list"
import { useSearch } from "features/search/hooks/use-search"
import { useClearReommendSearch } from "../hooks/use-clear-recommend-search"
import { KeyboardEvent, useRef, useState } from "react"
import styles from "./styles.module.scss"
import classNames from "classnames"

export const RecommendListSearch = () => {
    const [{titles, qty}] = useSearchRecommend()
    const [, searchBooks] = useRecommendList()
    const [, setSearch] = useSearch()
    const clearRecommends = useClearReommendSearch()
    const listRef = useRef<HTMLDivElement>(null)
    const [focusedIndex, setFocusedIndex] = useState(0);

    const handleClick = (title : string) => {
        searchBooks({
            query: title,
            limit: 24,
            offset: 0,
        })
        setSearch(title)
        clearRecommends()
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, index:number) => {

        event.preventDefault()
        switch (event.key) {
          case 'ArrowDown':
            setSearch(titles[(index+1 % titles.length)])
            setFocusedIndex((prevIndex) => (prevIndex + 1) % titles.length);
            break;
          case 'ArrowUp':
            setSearch(titles[(index-1 % titles.length)])
            setFocusedIndex((prevIndex) => (prevIndex - 1 + titles.length) %  titles.length);
            break;
          case 'Enter':
            searchBooks({
                query: titles[index],
                limit: 24,
                offset: 0,
            })
            setSearch(titles[index])
            clearRecommends()
            break;
          default:
            break;
        }
      };

    return <>
        {qty !== 0 &&  titles.map((item, index) => {
            return <div key={index}
            onKeyDown={(event) => handleKeyDown(event, index)}
            tabIndex={0} ref={index === focusedIndex ? listRef : null}
            onClick={() => handleClick(item)}
            className={classNames(
                styles.container,
                {[styles.active]: true},
            )}>
                <p>{item}</p>
            </div>
        })}
    </>
}
