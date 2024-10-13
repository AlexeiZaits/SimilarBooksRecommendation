import { useSearchRecommend } from "../hooks/use-recommend-search"
import { useRecommendList } from "features/recommendList/hooks/use-recommend-list"
import { useSearch } from "features/search/hooks/use-search"
import styles from "./styles.module.scss"
import classNames from "classnames"
import { useFocusElement } from "../hooks/use-focus-element"
import { useClearFocusRecommends } from "../hooks/use-clear-focus-recommend.ts"
import { setLocalTitle } from "../lib/setLocalTitle.ts"
import { useNavigate } from "react-router-dom"
import { LuRefreshCcw } from "react-icons/lu"
import { FaSearch } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { useDeleteLocalRecommend } from "../hooks/use-delete-local-recommend.ts"

export const RecommendListSearch = () => {
    const [{titles, qty}, searchRecommend] = useSearchRecommend()
    const [, searchBooks] = useRecommendList()
    const [, setSearch] = useSearch()
    const [focusedIndex] = useFocusElement()
    const clearFocus = useClearFocusRecommends()
    const navigate = useNavigate();
    const deleteRecommend = useDeleteLocalRecommend()

    const handleClick = (title : string) => {
        searchRecommend(title)
        navigate("")
        searchBooks({
            query: title,
            limit: 24,
            offset: 0,
        }, "search")
        setSearch(title)
        setLocalTitle(title)
        clearFocus()
    }

    return <>
        {qty !== 0 &&  titles.slice(0, 9).map((item, index) => {
            const {type, text} = item;
            const checkType = type === "local"

            return <button key={index}
                    onMouseDown={() => handleClick(text)}
                    className={classNames(
                        styles.button,
                        {[styles.active]: index === focusedIndex},
                    )}>
                    <i className={styles.icon}>
                        {checkType && <LuRefreshCcw />}
                        {!checkType && <FaSearch/>}
                    </i>
                    {text.length >= 43 ? text.slice(0,42) + "...": text}
                    {checkType && <i className={styles.delete}>
                        {<MdDelete onMouseDown={(e) => {
                            e.stopPropagation();
                            deleteRecommend(item)
                        }}  size={20}/>}
                    </i> }
        </button>
        })}
    </>
}
