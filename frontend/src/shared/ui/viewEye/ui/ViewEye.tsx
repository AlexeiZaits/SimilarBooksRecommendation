import { RiEyeCloseFill } from "react-icons/ri";
import { BsFillEyeFill } from "react-icons/bs";
import styles from "./styles.module.scss"

interface IViewEye {
    view: boolean
    onMouseUp?: () => void,
    onMouseDown?: () => void,
}

export const ViewEye = ({view, ...otherProps} : IViewEye) => {

    return <div {...otherProps} className={styles.container}>
        {view?  <BsFillEyeFill cursor={"pointer"}/> : <RiEyeCloseFill cursor={"pointer"}/>}
    </div>
}
