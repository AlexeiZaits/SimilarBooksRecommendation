import { useEffect } from "react"
import { getValidateForm } from "../lib/validateForm"
import { updateObjectMap } from "../lib/updateObjectMap"
import { IValidate, IValidateReg } from "shared/types"

export const useUpdateValidate = (value: string| string[], setValidateState: React.Dispatch<React.SetStateAction<IValidate>>) => {

    useEffect(() => {
        const verifiedObj: IValidateReg = getValidateForm(value)
        setValidateState((prevState) => {
            return updateObjectMap(prevState, verifiedObj)
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
}
