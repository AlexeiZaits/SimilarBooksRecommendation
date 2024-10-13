import { getValidateObject } from "../lib/getValidateObj"
import dataJson from "../../../../data.json"
import { getValidateForm, validateLetterCount, validateRegex, validateValueHasDigit, validateValueHasLowerCase, validateValueHasSpecialChar, validateValueHasUpperCase, validateValueLength } from "../lib/validateForm"
import { getValidateObjectTest, validateFormTest } from "../__mocks__/authFormMocsks";


export interface IValidationFunctions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: (value: any) => any
}

const validationFunctions: IValidationFunctions = {
    getValidateForm: getValidateForm,
    validateValueLength: (value: string) => validateValueLength(value, 5),
    validateValueHasDigit: (value: string) => validateValueHasDigit(value),
    validateValueHasSpecialChar: (value: string) => validateValueHasSpecialChar(value),
    validateValueHasLowerCase: (value: string) => validateValueHasLowerCase(value),
    validateValueHasUpperCase: (value: string) => validateValueHasUpperCase(value),
    validateLetterCount: (value: string) => validateLetterCount(value),
    validateRegex: (value: string) => validateRegex(value)
};

describe("authFormLib", () => {

    describe("getValidateObject" , () => {
        getValidateObjectTest.map((item) => {
            test(item.text, () => {
                const key = `${item.key+"Validate"}`;
                if (key in dataJson){
                    const correctKey = key as keyof typeof dataJson;
                    const expectedResult = typeof dataJson[correctKey];
                    const res = getValidateObject(item.key)

                    expect(typeof res).toStrictEqual(expectedResult)
                }
            })
        })
    })

    describe("validateForm" , () => {
        Object.keys(validateFormTest).forEach((item) => {
            describe(item, () => {
                if (item in validateFormTest){
                    const correctKey = item as keyof typeof validateFormTest;
                    validateFormTest[correctKey].forEach((itemTest) => {
                        test(itemTest.text , () => {
                            if (validationFunctions[item]) {
                                const res = validationFunctions[item](itemTest.value);
                                if (item === "getValidateForm") {
                                    expect(res).toStrictEqual(itemTest.expectedResult);
                                } else {
                                    expect(res).toBe(itemTest.expectedResult);
                                }
                            }
                            else {
                                throw new Error("Такой функции нету")
                            }
                        })
                    })
                }
            })
        })
    })
})
