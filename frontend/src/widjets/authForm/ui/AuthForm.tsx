import { useState } from "react"
import { Input } from "../../../shared/ui/input/ui/Input"
import styles from "./styles.module.scss"
import { Button } from "shared/ui"
import { IUserForm } from "shared/types"
import { useAppDispatch, useAppSelector } from "app/store/store"
import { PreloaderModal } from "shared/ui/preloaderModal/ui/Preloader"
import { authUser } from "features/authorization/model/auth-actions"

export const AuthForm = () => {
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [staySign, setStaySign] = useState(false)
    const dispatch = useAppDispatch()
    const {error, status} = useAppSelector(state => state.authorization)
    
    function handleClick(user: IUserForm) {
        dispatch(authUser(user))
        setLogin("")
        setPassword("")
    }
    
    return <div className={styles.container}>
        {status === "loading" && <PreloaderModal/>}
        <div className={styles.form}>
            <p className={styles.signin}>Авторизация</p>
            <div className={styles.authForm}>
                <Input error={error ? true : false} value={login} placeholder="Логин" type="login" onChange={e => setLogin(e.target.value)}/>
                <Input error={error ? true : false} value={password} placeholder="Пароль" type="password" onChange={e => setPassword(e.target.value)}/>
                <div className={styles.checkbox}>
                    <Input style={{width: "1rem", marginLeft:"2rem"}} type="checkbox" value={staySign} onClick={() => setStaySign((prevState) => !prevState)}/>
                    <span className={styles.sign}>запомнить меня</span>
                </div>
                <Button onClick={() => handleClick({login: login, password: password})} text={"Вход"}/>
            </div>
            <p className={styles.forgot}>Забыли пароль?</p>
        </div>
    </div>
}