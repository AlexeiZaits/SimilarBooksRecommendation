import { FcCheckmark } from "react-icons/fc"
import { IoClose } from "react-icons/io5"
import styles from "./styles.module.scss"
import { IValidateItem } from "widjets/authForm/ui/FormTips"


export const ValidateItem = ({check, text} :IValidateItem) => {
    return <div className={styles.container}>
        {!check ? <IoClose size={25} color="red" /> : <FcCheckmark size={25}/>}
        <p className={styles.text}>{text}</p>
    </div>
}
