import { IValidateReg } from "shared/types";

export const getValidateForm = (value: string[] | string) => {
    if (typeof value === "string"){
        return validateLogin(value)
    } else if ( value.length === 2) {
        return validatePasswords(value);
    } else {
        throw new Error("Ошибка в кол-ве передоваемых строк")
    }

}

export const validateValueLength = (value: string, length: number) => {
    return value.length > length
}

export const validateValueHasDigit = (value: string) => {
    return /[0-9]/.test(value)
}

export const validateValueHasSpecialChar = (value: string) => {
    return /[!@#$%^&*]/.test(value);
}

export const validateValueHasLowerCase = (value: string) => {
    return /[a-z]/.test(value);
}

export const validateValueHasUpperCase = (value: string) => {
    return /[A-Z]/.test(value);
}

export const validateLetterCount = (value: string) => {
    return (value.match(/[a-zA-Z]/g) || []).length > 2;
}

export const validateRegex = (value: string) => {
    return /^[a-zA-Z][a-zA-Z0-9]*$/.test(value);
}

export const validatePasswords = (passwords: string[]):IValidateReg => {
    return {
    length: validateValueLength(passwords[0], 5),
    digit: validateValueHasDigit(passwords[0]),
    specialChar: validateValueHasSpecialChar(passwords[0]),
    lowerCase: validateValueHasLowerCase(passwords[0]),
    upperCase: validateValueHasUpperCase(passwords[0]),
    passwordCheck: passwords[0] === passwords[1]
    }
}

export const validateLogin = (login: string):IValidateReg => {

    return {
    letterCount: validateLetterCount(login),
    regex: validateRegex(login),
    length: validateValueLength(login, 5)
    }
}

export const validateFullForm = (passwords: string[], login: string) => {
    return validateFullPasswords(passwords) && validateFullLogin(login)
}

export const validatePassword = (password: string) => {
    return /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(password)
}

export const validateFullPasswords = (passwords: string[]) => {
    return /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(passwords[0]) && passwords[0] === passwords[1]
}

export const validateFullLogin = (login: string) => {
    return /^(?=[a-zA-Z])(?=[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$)(?=.{6,}).*$/.test(login);
}
