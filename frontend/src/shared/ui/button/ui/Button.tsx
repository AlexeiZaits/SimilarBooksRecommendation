import { CSSProperties, ReactNode } from "react"
import styles from "./styles.module.scss"
import classNames from "classnames"
import React from "react"

interface IButton {
    text?: string,
    svg?: ReactNode,
    style?: CSSProperties,
    secondary?: boolean,
    noActive?: boolean,
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void,
    children?: ReactNode,
}

export const Button = ({text, svg, secondary, children, noActive, onClick,  ...otherProps}:IButton) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onClick && onClick(e)
    }

    return <button className={classNames(
        styles.button,
        {[styles.secondary]: secondary},
        {[styles.noActive]: noActive}
    )}

    onClick={handleClick}
    {...otherProps}>
        {svg}
        {text}
        {children}
    </button>
}
