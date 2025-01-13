import { Link } from "react-router-dom"
import styles from "./styles.module.scss"
import { CardAnime } from "entities/index";

const genresList = [
    {link: "one-piece", text: "One piece qweqeqewqeq", author: "Эйитиро Ода", rating: 4.8, views: 3000}, {link: "one-piece", text: "One piece", author: "Эйитиро Ода", rating: 4.8, views: 3000}, {link: "one-piece", text: "One piece", author: "Эйитиро Ода", rating: 4.8, views: 3000},
    {link: "one-piece", text: "One piece", author: "Эйитиро Ода", rating: 4.8, views: 3000}, {link: "one-piece", text: "One piece", author: "Эйитиро Ода", rating: 4.8, views: 3000}, {link: "one-piece", text: "One piece", author: "Эйитиро Ода", rating: 4.8, views: 3000}
]

const genresCategory = [
    "Новинки",
    "Рекомендации для вас",
    "Просмотренные аниме",
    "Популярное",
]

export const WhatToSeePage = () => {


    return <div className={styles.container}>
        <h2>slider</h2>
        {genresCategory.map((item, index) => {
            return <section key={index} className={styles.section}>
            <div className={styles.header}><h2 className={styles.title}>{item}</h2><Link to={item} className={styles.linkHeader}>Все</Link></div>
            <div className={styles.genres}>
                {genresList.map((item, index) => {
                    return <CardAnime item={item} key={index}/>
                })}
            </div>
        </section>
        })}
    </div>
}
