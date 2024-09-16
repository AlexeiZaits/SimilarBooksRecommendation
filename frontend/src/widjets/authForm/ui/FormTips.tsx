import { useEffect, useState } from "react"
import { validateForm } from "../lib/validaForm"
import styles from "./styles.module.scss"
import { ValidateItem } from "entities/validateItem/ui/ValidateItem"

export interface IValidateItem {
    check: boolean,
    text: string
}

export interface IValidate {
    [key: string] : IValidateItem
}

export interface IValidateReg {
    [key: string]: boolean
}

const updateObjectMap = (prevObj: IValidate, updateObject: IValidateReg) => {
    const newObj = {...prevObj}
    Object.keys(newObj).map((item) => {
        newObj[item].check = updateObject[item]
    })

    return newObj
}

const loginValidate : IValidate = {
    length: {check: false, text: "6 символов и начинаться с буквы"},
    letterCount: {check: false, text: "Минимум 3 буквы"},
    regex: {check: false, text: "Только буквы и цифры"}
}


const passwordValidate : IValidate = {
    length: {check: false, text: "Минимум 6 символов"},
    digit: {check: false, text: "Одна цифра"},
    specialChar: {check: false, text: "Один сивмвол из !@#$%^&*"},
    lowerCase: {check: false, text: "Одна мальнекая буква"},
    upperCase: {check: false, text: "Одна большая буква"},
    passwordCheck: {check: false, text: "Пароли совпадают"}
}

export type typeValidate = "login" | "password"

const getValidateObject = (key:typeValidate) => key === "login" ? loginValidate: passwordValidate

interface IFormTips {
    value: string | string[],
    keyValidate: typeValidate
}

export const FormTips = ({value, keyValidate}: IFormTips) => {
    const [validateState, setValidateState] = useState(getValidateObject(keyValidate))

    useEffect(() => {
        const verifiedObj: IValidateReg = validateForm(value)
        setValidateState((prevState) => {
            return updateObjectMap(prevState, verifiedObj)
        })

    }, [value])

    return <div className={styles.formTips}>
        <h2 className={styles.title}>Проверка {keyValidate === "login" ?  "логина": "пароля"}</h2>
        {Object.keys(validateState).map((item, index) => {
            return <ValidateItem key={index} text={validateState[`${item}`].text} check={validateState[`${item}`].check}/>
        })}
    </div>
}
