import { CSSProperties } from "react";
import styles from "./styles.module.scss"
import classNames from "classnames";


export interface IInput {
    value: string| boolean,
    error?: boolean,
    type?: string,
    placeholder?: string,
    style?: CSSProperties,
    secondary?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onClick?: () => void
}

export const Input = ({value, error=false, secondary, ...otherProps}:IInput) => {
    
    return <input 
    className={classNames(
        styles.input,
        { [styles.secondary]: secondary}    
    )}
    style={{ borderColor: error ? "red": "" }}
    value={String(value)} 
    {...otherProps}  />
}