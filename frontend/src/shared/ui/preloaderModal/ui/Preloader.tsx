import styles from "./styles.module.scss";

export const PreloaderModal = () => {
    return <div className={styles.modal}>
            <div className={styles.loader}>loading</div>
    </div>
}