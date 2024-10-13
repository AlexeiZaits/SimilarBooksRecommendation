import { IValidate, IValidateReg } from "shared/types/formTips"

export const updateObjectMap = (prevObj: IValidate, updateObject: IValidateReg) => {
    const newObj = {...prevObj}

    Object.keys(newObj).map((item) => {
        newObj[item].check = updateObject[item]
    })

    return newObj
}
