import { TiRefreshOutline } from "react-icons/ti"
import styles from "./styles.module.scss"
import { getThemeColor } from "shared/lib/getThemeColor"

export interface IRecommnedSearch{
    title: string,
    key?: "local" | "search",
    onClick: (title: string) => void,
}

export const RecommendSearch = ({title, onClick}: IRecommnedSearch) => {


    return <div onClick={() => onClick(title)} className={styles.container}>
        <TiRefreshOutline color={getThemeColor()}/>
        <p>{title}</p>
    </div>
}
