import { Link } from "react-router-dom"
import styles from "./styles.module.scss"
import image from "../../../shared/assets/images/anime.jpg"

// вынести в бд
const genresList = [
{link: "demons", text: "Демоны"}, {link: "demons", text: "Демоны"}, {link: "demons", text: "Демоны"},
{link: "demons", text: "Демоны"}, {link: "demons", text: "Демоны"}, {link: "demons", text: "Демоны"}
]

const genresCategory = [
    "Все жанры",
    "Рекомендуемые жанры",
    "Популярные жанры",
]

export const GenresPage = () => {


    return <div className={styles.container}>
        {genresCategory.map((item, index) => {
            return <section key={index} className={styles.section}>
            <h2 className={styles.title}>{item}</h2>
            <div className={styles.genres}>
                {genresList.map((item, index) => {
                    return <Link key={index} to={item.link} className={styles.genre}>
                        <img src={image} className={styles.img}/>
                        <p className={styles.text}>{item.text}</p>
                    </Link>
                })}
            </div>
        </section>
        })}
    </div>
}
