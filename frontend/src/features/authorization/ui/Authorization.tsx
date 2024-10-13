import { useAppDispatch } from "app/store/store"
import { ReactNode, useEffect } from "react"
import { refreshUser } from "../model/auth-actions"
// import { useNavigate } from "react-router-dom"

interface IAuth {
    children: ReactNode
}

export const Authorization = ({children}:IAuth) => {
    // const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem("token")){
            dispatch(refreshUser())
        }
    }, [dispatch])

    return <>
        {children}
    </>
}
