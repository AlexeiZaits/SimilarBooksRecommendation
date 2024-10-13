import { IValidate, typeValidate } from "shared/types"
import dataJson from "../../../../data.json"

export const loginValidate : IValidate = dataJson.loginValidate
export const passwordValidate : IValidate = dataJson.passwordValidate

export const getValidateObject = (key:typeValidate) => {

    if (key === "login"){
        return loginValidate
    } else {
        return passwordValidate
    }
}
