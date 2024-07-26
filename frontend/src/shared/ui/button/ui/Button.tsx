import { CSSProperties, ReactNode } from "react"
import styles from "./styles.module.scss"
import classNames from "classnames"

interface IButton {
    text?: string,
    svg?: ReactNode,
    onClick?: () => void,
    style?: CSSProperties,
    secondary?: boolean,
    children?: ReactNode,
}

export const Button = ({text, svg, secondary, children, onClick, ...otherProps}:IButton) => {
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onClick && onClick()
    }

    return <button className={classNames(
        styles.button,
        {[styles.secondary]: secondary},
    )} 
    onClick={handleClick} 
    {...otherProps}>
        {svg}
        {text}
        {children}
    </button>
}