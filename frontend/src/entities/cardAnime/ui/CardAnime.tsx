import { Link } from "react-router-dom"
import styles from "./styles.module.scss"
import { FaStar } from "react-icons/fa"
import image from "../../../shared/assets/images/animeCard.jpg"

export const  CardAnime = ({item}) => {
    return <Link to={"/watch" + "/" + item.link} className={styles.genre}>
        <img src={image} className={styles.img}/>
        <h3 className={styles.subtitle}>{item.text}</h3>
        <p className={styles.author}>{item.author}</p>
        <span className={styles.descp}><span className={styles.rating}><FaStar /> {item.rating}</span> {item.views}</span>
    </Link>
}
