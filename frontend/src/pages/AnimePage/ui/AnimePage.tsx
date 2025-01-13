import styles from "./styles.module.scss"
import { CardAnime } from "entities/index"
// import { Like } from "features/index";
import { VscSettings } from "react-icons/vsc";

const genresList = [
    {link: "one-piece", text: "One piece qweqeqewqeq", author: "Эйитиро Ода", rating: 4.8, views: 3000}, {link: "one-piece", text: "One piece", author: "Эйитиро Ода", rating: 4.8, views: 3000}, {link: "one-piece", text: "One piece", author: "Эйитиро Ода", rating: 4.8, views: 3000},
    {link: "one-piece", text: "One piece", author: "Эйитиро Ода", rating: 4.8, views: 3000}, {link: "one-piece", text: "One piece", author: "Эйитиро Ода", rating: 4.8, views: 3000}, {link: "one-piece", text: "One piece", author: "Эйитиро Ода", rating: 4.8, views: 3000}
]

export const AnimePage = () => {

    //TODO: добавить лайки для карточек
    return <section className={styles.container}>
        <div className={styles.header}>
            <h2 className={styles.title}>Аниме</h2>
            <VscSettings className={styles.settings} />
        </div>
        <div className={styles.genres}>
                {genresList.map((item, index) => {
                    return <CardAnime key={index} item={item}/>
                })}
            </div>
    </section>
}
