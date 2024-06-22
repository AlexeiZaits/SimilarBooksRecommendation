import { CSSProperties } from "react";
import styles from "./styles.module.scss"

export interface IInput {
    value: string| boolean,
    error?: boolean,
    type?: string,
    placeholder?: string,
    style?: CSSProperties;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onClick?: () => void
}

export const Input = ({value, error=false, ...otherProps}:IInput) => {
    
    return <input 
    className={styles.input} 
    style={{ borderColor: error ? "red": "" }}
    value={String(value)} 
    {...otherProps}  />
}