import { IValidateReg } from "../ui/FormTips";

export const validateForm = (value: string[] | string) => {
    return typeof value === "string" ? validateLogin(value): validatePassword(value)
}

export const validatePassword = (passwords: string[]):IValidateReg => {
    const lengthCheck = passwords[0].length > 5
    const hasDigit = /[0-9]/.test(passwords[0]);
    const hasSpecialChar = /[!@#$%^&*]/.test(passwords[0]);
    const hasLowerCase = /[a-z]/.test(passwords[0]);
    const hasUpperCase = /[A-Z]/.test(passwords[0]);

    return {
    length: lengthCheck,
    digit: hasDigit,
    specialChar: hasSpecialChar,
    lowerCase: hasLowerCase,
    upperCase: hasUpperCase,
    passwordCheck: passwords[0] === passwords[1]
    }
}

export const validateLogin = (login: string):IValidateReg => {
    const letterCountCheck = (login.match(/[a-zA-Z]/g) || []).length > 2;
    const regexCheck = /^[a-zA-Z][a-zA-Z0-9]*$/.test(login);
    const lengthCheck = login.length > 5;

    return {
    letterCount: letterCountCheck,
    regex: regexCheck,
    length: lengthCheck
    }
}

export const validateFullForm = (passwords: string[], login: string) => {
    return validateFullPassword(passwords) && validateFullLogin(login)
}

export const validateFullPassword = (passwords: string[]) => {
    return /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(passwords[0]) && passwords[0] === passwords[1]
}

export const validateFullLogin = (login: string) => {
    return /^(?=[a-zA-Z])(?=[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$)(?=.{6,}).*$/.test(login);
}
