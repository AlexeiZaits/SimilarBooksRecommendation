import { CSSProperties, ReactNode } from "react"
import styles from "./styles.module.scss"

interface IButton {
    text?: string,
    svg?: ReactNode,
    onClick?: () => void,
    style: CSSProperties,
    children?: ReactNode,
}

export const Button = ({text, svg, children, onClick, ...otherProps}:IButton) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onClick && onClick()
    }
        
    return <button className={styles.button} onClick={handleClick} {...otherProps}>
        {svg}
        {text}
        {children}
    </button>
}