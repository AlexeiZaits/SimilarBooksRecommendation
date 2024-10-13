import { RiEyeCloseFill } from "react-icons/ri";
import { BsFillEyeFill } from "react-icons/bs";
import styles from "./styles.module.scss"
import { TouchEvent } from "react";

interface IViewEye {
    view: boolean,
    color: string,
    onMouseUp?: () => void,
    onMouseDown?: () => void,
    onTouchStart?: (e: TouchEvent<HTMLDivElement>) => void,
}

export const ViewEye = ({view, color, ...otherProps} : IViewEye) => {

    return <div {...otherProps} className={styles.container}>
        {view?  <BsFillEyeFill color={color} cursor={"pointer"}/> : <RiEyeCloseFill color={color} cursor={"pointer"}/>}
    </div>
}
