import { useEffect, useState } from "react"
import { Input } from "../../../shared/ui/input/ui/Input"
import styles from "./styles.module.scss"
import { Button, Preloader, ViewEye, withModal } from "shared/ui"
import { IUserForm } from "shared/types"
import { useAppDispatch, useAppSelector } from "app/store/store"
import { authUser, regUser } from "features/authorization/model/auth-actions"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import classNames from "classnames"
import { clearErrorAuth } from "features/authorization/model/auth-slice"
import { FormTips } from "./FormTips"
import { validateFullForm } from "../lib/validateForm"


const PreloaderWithModal = withModal(Preloader)

const initialState: IUserForm = {
    login: "",
    password: "",
    passwordWithCheck: "",
    toggleTips: false,
    toggleTipsValidate: false,
    error: true,
    passwordView: "password",
    passwordWithCheckView: "password"
}

const navList = [
    {link: "/authorization", name: "Авторизация"},
    {link: "/registration", name: "Регистрация"},
]

type TType = "login" | "password" | "error" | "submit"| "text" | "passwordWithCheck";
type SpecialType = "passwordCheck"

interface IFormItem {
    type: TType,
    text: string | string[],
    scepialType?: SpecialType
}


const formList: IFormItem[] = [
    {type: "login",text: "Логин"},
    {type: "password", text: "Пароль"},
    {type: "passwordWithCheck", text: "Подтвердите пароль"},
    {type: "error", text: ["Неверный логин или пароль", "Неверный формат логина или пароля"]},
    {type: "submit", text: ["Вход", "Регистрация"]},

]

const testPassword = (password: string) => {
    return /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(password)
}

const updateObject = (prevObj: IUserForm, key: string, data: string | boolean) => {
    const newObj = {
        ...prevObj,
        [key]: data
    }

    return newObj
}


const newInitialState = () => initialState

export const AuthForm = () => {
    const [user, setUser] = useState<IUserForm>(newInitialState)
    const dispatch = useAppDispatch()
    const {error, status, isAuth} = useAppSelector(state => state.authorization)
    const navigate = useNavigate()
    const {pathname} = useLocation()

    function handleSubmit(user: IUserForm) {
        if (pathname === navList[0].link){
            dispatch(authUser(user))
        } else if (pathname === navList[1].link && validateFullForm([String(user.password), String(user.passwordWithCheck)], String(user.login))){
            dispatch(regUser(user))
        }
    }

    useEffect(() => {
        setUser((prevUser)=> updateObject(prevUser, "error", testPassword(String(user.password))))

    }, [user.password])

    const handleChange = (data: string, item: IFormItem) => {
        const check = item.type === "login" ? /^[a-zA-Z0-9]*$/.test(data): true;
        if(check){
            setUser((prevUser) => {
                return updateObject(prevUser, item.type, data)
            })
        }
    }

    const handleMouse = (key: string, view: boolean) => {
        setUser((prevUser) => {
            return updateObject(prevUser, key + "View", !view ? "text": "password")
        })
    }

    useEffect(() => {
        if (status === "rejected"){
            setUser((prevState) => {
                return updateObject(prevState, "password", "")
            })
        }
    },  [status])

    useEffect(() => {
        dispatch(clearErrorAuth())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    useEffect(() => {
        if (isAuth){
            navigate('/')
        }
    }, [isAuth, navigate])

    const handleFocus = (key: TType) => {
        setUser((prevState) => {
            const newObj = updateObject(prevState, "toggleTips", true);

            return updateObject(newObj, "toggleTipsValidate", key === "login");
        })
    }

    const handleBlur = () => {
        setUser((prevState) => {
            return updateObject(prevState, "toggleTips", false)
        })
    }

    const checkPathname = pathname === navList[0].link
    const validateForm = !validateFullForm([String(user.password), String(user.passwordWithCheck)], String(user.login)) && !checkPathname

    return <div className={styles.container}>
        {status === "loading" && <PreloaderWithModal/>}
        {<form className={styles.form}>
            <nav className={styles.navForm}>
                {navList.map((item, index) => {
                    return <NavLink key={index} to={item.link} className={({isActive}) => classNames(styles.link, {
                        [styles.activeLink]: isActive
                    })}>{item.name}</NavLink>
                })}
            </nav>
            <div className={styles.authForm}>
                {formList.map((item, index) => {
                    if (item.type === "login" || item.type === "password" || (item.type === "passwordWithCheck"  && !checkPathname) || item.type === "text"){
                        let type = "";
                        if (item.type === "password" || item.type === "passwordWithCheck"){
                            type = item.type === "password" ? String(user.passwordView)  : String(user.passwordWithCheckView)
                        } else{
                            type = item.type
                        }

                        return <div className={styles.input}>
                            <Input
                            onFocus={!checkPathname ? () => handleFocus(item.type) : () => {}}
                            onBlur={!checkPathname ? handleBlur : () => {}}
                            key={index}
                            error={error ? true : false}
                            value={user[item.type]}
                            placeholder={String(item.text)}
                            type={type}
                            onChange={(e) => handleChange(e.target.value, item)}/>
                            {item.type === "password" || item.type ==="passwordWithCheck" ? <ViewEye onMouseDown={() => handleMouse(item.type, false)} onMouseUp={() => handleMouse(item.type, true)}  view={item.type === "password"? user.passwordView === "password" ?  false : true : user.passwordWithCheckView === "password" ?  false : true}/> : null}
                        </div>
                    } else if (item.type === "submit"){
                        return <Button
                        noActive={validateForm}
                        key={index}

                        onClick={() => handleSubmit(user)}
                        text={checkPathname ? item.text[0] : item.text[1]}
                        type={item.type}/>
                    } else if (item.type === "error") {
                        return <p key={index} className={styles.errorText}>{error ? checkPathname ? item.text[0]: item.text[1]: ""}</p>
                    }
                })}
            </div>
            {true  && <p className={styles.forgot}>Забыли пароль?</p>}
            {user.toggleTips && !checkPathname && <div className={styles.modal}>
                <FormTips value={user.toggleTipsValidate ? String(user.login): [String(user.password), String(user.passwordWithCheck)]} keyValidate={user.toggleTipsValidate ? "login": "password"}/>
            </div>}
        </form>}
    </div>
}
