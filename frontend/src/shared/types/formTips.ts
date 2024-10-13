export interface IValidateItem {
    check: boolean,
    text: string,
    id?: string
}

export interface IValidate {
    [key: string] : IValidateItem
}

export interface IValidateReg {
    [key: string]: boolean
}

export type typeValidate = "password" | "login"

export interface IFormTips {
    value: string | string[],
    keyValidate: typeValidate
}
