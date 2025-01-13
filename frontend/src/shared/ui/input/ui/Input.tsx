import { CSSProperties, forwardRef } from "react";
import styles from "./styles.module.scss"
import classNames from "classnames";


export type TypeInput = "password" | "text" | "radio" | "checkbox" | "hidden" | "button" | "file" | "image" | "reset" | "submit" | "email";

export interface IInput {
    value: string | boolean | number,
    type?: TypeInput,
    placeholder?: string,
    style?: CSSProperties,
    tabIndex?: number,
    error?: boolean,
    secondary?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onClick?: () => void,
    onBlur?: () => void,
    onFocus?: () => void,
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, IInput>(({ value, error = false, secondary, ...otherProps }, ref?) => {
    return (
        <input
            className={classNames(
                styles.input,
                {
                    [styles.secondary]: secondary,
                    [styles.error]: error,
                }
            )}
            value={String(value)}
            {...otherProps}
            ref={ref}
        />
    );
});
