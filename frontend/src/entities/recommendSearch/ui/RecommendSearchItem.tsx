import styles from "./styles.module.scss"

export interface IRecommnedSearch{
    title: string,
    onClick: (title: string) => void,
}

export const RecommendSearch = ({title, onClick}: IRecommnedSearch) => {


    return <div onClick={() => onClick(title)} className={styles.container}>
        <p>{title}</p>
    </div>
}
