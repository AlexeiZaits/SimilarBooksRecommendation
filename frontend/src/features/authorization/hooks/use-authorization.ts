import { useAppDispatch, useAppSelector } from "app/store/store"
import { IAuthSlice, setAuthSlice, TAuthPayload, TKeyAuth } from "../model/auth-slice"

export const useAuthorization = (): [(key: TKeyAuth, data: TAuthPayload[TKeyAuth]) => void, IAuthSlice] => {
    const dispatch = useAppDispatch()
    const stateSlice = useAppSelector(state => state.authorization)

    const updateAuthorizationSlice = (key: TKeyAuth, data: TAuthPayload[TKeyAuth]) => dispatch(setAuthSlice({key: key, data: data}))

    return [updateAuthorizationSlice, stateSlice]
}
