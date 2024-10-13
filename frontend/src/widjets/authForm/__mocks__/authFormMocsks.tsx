import { typeValidate } from "shared/types"

interface IGetValidateObjectTest {
    key: typeValidate,
    text: string
}

export const getValidateObjectTest: IGetValidateObjectTest[] = [
    {key: "login", text: "Должен вернуть обьект loginValidate если ключ равен login"},
    {key: "password", text: "Должен вернуть обьект passwordValidate если ключ равен password"}
]

export const validateFormTest = {
    getValidateForm: [
        {expectedResult: {
        letterCount: false,
        regex: false,
        length: false,
        }, value: "", text: "Должен вернуть обьект validateLogin если value равно строке"},
        {expectedResult: {
            length: false,
            digit: false,
            specialChar: false,
            lowerCase: false,
            upperCase: false,
            passwordCheck: true,
        }, value: ["", ""], text: "Должен вернуть обьект validatePassword если value равно массиву из строк"}]
    ,

    validateValueLength: [
        {expectedResult: false, value: "F", text: "Должен вернуть ложь при длине меньше чем 5"},
        {expectedResult: true, value: "Far29!", text: "Должен вернуть истину при длине большей чем 5"},
    ],
    validateValueHasDigit: [
        {expectedResult: false, value: "F", text: "Должен вернуть ложь если строка не имеет цифры"},
        {expectedResult: true, value: "Far29!", text: "Должен вернуть истинну если строка имеет цифру"},
    ],
    validateValueHasSpecialChar: [
        {expectedResult: false, value: "F", text: "Должен вернуть ложь если не имеет символа из данных символов !@#$%^&*"},
        {expectedResult: true, value: "Far29!", text: "Должен вернуть истинну если имеет символ из данных символов !@#$%^&*"},
    ],
    validateValueHasLowerCase: [
        {expectedResult: false, value: "F", text: "Должен вернуть ложь если не имеет одной маленькой буквы"},
        {expectedResult: true, value: "Far29!", text: "Должен вернуть инстину если имеет одну маленькую буквы"},
    ],
    validateValueHasUpperCase: [
        {expectedResult: false, value: "f", text: "Должен вернуть ложь если не имеет одной большую букву"},
        {expectedResult: true, value: "Far29!", text: "Должен вернуть инстину если имеет одну большу букву"},
    ],
    validateLetterCount: [
        {expectedResult: false, value: "f", text: "Должен вернуть ложь если не имеет длину большей чем 2 из букв"},
        {expectedResult: true, value: "Far29!", text: "Должен вернуть инстину если имеет длину большей чем 2 из букв"},
    ],
    validateRegex: [
        {expectedResult: false, value: "!", text: "Должен вернуть ложь если не значение не имеет только буквы и цифры"},
        {expectedResult: true, value: "Far29", text: "Должен вернуть инстину если имеет только цифры и буквы"},
    ]
}
