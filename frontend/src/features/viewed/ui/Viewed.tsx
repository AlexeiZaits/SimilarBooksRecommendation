import { MdOutlineRemoveRedEye } from "react-icons/md";
import styles from "./styles.module.scss"
import { useState } from "react";

export const Viewed = () => {
    const [view, setView] = useState(false)

    return <div className={styles.viewed}>
        <p className={styles.viewedText}>Отметить как просмотренное</p>
        <MdOutlineRemoveRedEye onClick={() => setView(prevState => !prevState)} fill={view ? "yellow": "white"} className={styles.eye} />
    </div>
}
