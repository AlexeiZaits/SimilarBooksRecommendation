import { useState } from "react"
import { ValidateItem } from "entities/validateItem/ui/ValidateItem"
import { useUpdateValidate } from "../hooks/useUpdateValidate"
import { getValidateObject } from "../lib/getValidateObj"
import styles from "./styles.module.scss"
import { IFormTips } from "shared/types"


export const FormTips = ({value, keyValidate}: IFormTips) => {
    const [validateState, setValidateState] = useState(getValidateObject(keyValidate))
    useUpdateValidate(value, setValidateState)

    return <div className={styles.formTips}>
        <h2 className={styles.title}>Проверка {keyValidate === "login" ?  "логина": "пароля"}</h2>
        {Object.keys(validateState).map((item, index) => {
            return <ValidateItem key={index} text={validateState[`${item}`].text} check={validateState[`${item}`].check}/>
        })}
    </div>
}
