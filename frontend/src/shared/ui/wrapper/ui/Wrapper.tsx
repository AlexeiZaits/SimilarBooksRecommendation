import { ReactNode } from "react"
import styles from "./styles.module.scss"

interface IWrapper {
    children: ReactNode
}

export const Wrapper = ({children}: IWrapper) => {
    return <div className={styles.wrapper}>
        {children}
    </div>
}