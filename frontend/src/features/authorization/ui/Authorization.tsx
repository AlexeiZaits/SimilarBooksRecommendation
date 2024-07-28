import { useAppDispatch, useAppSelector } from "app/store/store"
import { ReactNode, useEffect } from "react"
import { refreshUser } from "../model/auth-actions"
import { PreloaderModal } from "shared/ui/preloaderModal/ui/Preloader"
import { useNavigate } from "react-router-dom"

interface IAuth {
    children: ReactNode
}

export const Authorization = ({children}:IAuth) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {status, isAuth} = useAppSelector(state => state.authorization)

    useEffect(()=> {
        status === "rejected" && navigate("/authorization")
    }, [navigate, status])

    useEffect(() => {
        if (localStorage.getItem("token")){
            dispatch(refreshUser())
        }
    }, [dispatch])

    return <>
        {status === "loading" && <PreloaderModal/>}
        {isAuth && children}
    </>
}
