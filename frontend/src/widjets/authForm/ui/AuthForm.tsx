import { TouchEvent, useEffect, useState, MouseEvent, useRef } from "react"
import classNames from "classnames"
import { Button, Preloader, ViewEye, withModal } from "shared/ui"
import { FormTips } from "./FormTips"
import { validateFullForm, validateFullLogin, validateFullPasswords, validatePassword } from "../lib/validateForm"
import { FaRegQuestionCircle } from "react-icons/fa"
import { IoCloseCircleOutline } from "react-icons/io5"
import { getThemeColor } from "shared/lib/getThemeColor"
import { updateObject } from "../lib/updateObject"
import { IUserForm } from "shared/types"
import { Input, TypeInput } from "../../../shared/ui/input/ui/Input"
import { useAuthorization } from "features/authorization/hooks/use-authorization"
import { useActionsAuthorization } from "features/authorization/hooks/use-actions-authorization"
import useWindowSize from "widjets/carusel/hooks/useWindowSize"
import dataJson from "../../../../data.json"
import styles from "./styles.module.scss"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useToggleWidjet } from "features/togglerWidjets/hooks/use-toggle-widget"
import { listWidgets } from "features/togglerWidjets/lib/listWidgets"

const PreloaderWithModal = withModal(Preloader)

type TType = "password" | "error" | "submit"| "text" | "email" | "passwordWithCheck" | "message"| "login";

interface IFormItem {
    type: TType,
    text?: string | string[],
    id: number
}

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

const navList = dataJson.navList

const formList: IFormItem[] = dataJson.formList as IFormItem[]
type TPathname = "Авторизация" | "Регистрация"

const newInitialState = () => initialState

export const AuthForm = () => {
    //TODO: рефактор
    const [user, setUser] = useState<IUserForm>(newInitialState)
    const [notification, setNotification] = useState(false)
    const [pathname, setPathname] = useState<TPathname>()
    const refFormTips = useRef<HTMLDivElement>(null)
    const [open, toggleOpen] = useToggleWidjet(listWidgets.authForm)
    const [setAuthorization, {error, status, isAuth, message}] = useAuthorization()
    const handleActions = useActionsAuthorization()
    const windowSize = useWindowSize()
    const checkPathname = pathname === "Авторизация"
    const validateForm = !validateFullForm([String(user.password), String(user.passwordWithCheck)], String(user.login)) && !checkPathname

    const handleSubmit = (user: IUserForm) => {
        if (checkPathname){
            handleActions("login", user)
        } else if (!checkPathname && !validateForm){
            handleActions("register", user)
        }
    }

    const handleChange = (data: string, item: IFormItem) => {
        const check = item.type === "text" ? /^[a-zA-Z0-9]*$/.test(data): true;
        if(check){
            updateUser(item.type, data);
        }
    }

    const updateUser = (key: string, data: string | boolean) => {
        setUser((prevUser) => {
            return updateObject(prevUser, key, data)
        })
    }

    const handleMouse = (key: string, view: boolean) => {
        updateUser(key + "View", !view ? "text": "password")
    }

    const handleTouch = (e: TouchEvent<HTMLDivElement> | MouseEvent<SVGElement>, key: string, view: boolean) => {
        e.preventDefault();

        if (key === "password" || key === "passwordWithCheck" || key === "toggleTips"){
            updateUser(key + "View", view ? "text": "password");
        }
    }

    const handleView = (key: TType) => {
        setUser((prevState) => {
            const newObj = updateObject(prevState, "toggleTips", true);
            return updateObject(newObj, "toggleTipsValidate", key === "login");
        })
    }

    const handleCloseNotif = () => {
        setNotification(false)
    }

    const handleBlur = () => {
        updateUser("toggleTips", false)
    }

    useEffect(() => {
        if(open){
            document.body.style.overflow = "hidden"
        }

        return () => {document.body.style.overflow = "auto"}
    }, [open])

    useEffect(() => {
        if (status === "received" && !checkPathname){
            setNotification(true)
            setPathname("Авторизация")
        } else if (status === "rejected") {
            updateUser("password", "");
        }
    }, [status])

    useEffect(() => {
        if (windowSize < 1024){
            refFormTips.current?.focus()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.toggleTips])

    useEffect(() => {
        //TODO: Улучшить
        setAuthorization("error", null)
        setAuthorization("message", "")
        setAuthorization("status", "idle")

        return () => setAuthorization("status", "idle")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    useEffect(() => {
        if (isAuth && status === "received"){
            toggleOpen()
        }
    }, [isAuth, status])

    useEffect(() => {
        updateUser("error", validatePassword(String(user.password)))
    }, [user.password])

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if(target.id === "auth-widjet"){
            toggleOpen()
        }
    }

    return <>
    {open && <div id="auth-widjet" onClick={handleClick} className={styles.container}>
        {<Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={notification} autoHideDuration={3000} onClose={handleCloseNotif}>
            <Alert onClose={handleCloseNotif} severity="success">
                Вы успешно зарегистрированны
            </Alert>
        </Snackbar>}
        {status === "loading" && <PreloaderWithModal/>}
        {<form className={styles.form}>
            <nav className={styles.navForm}>
                {navList.map((item, index) => {
                    return <div
                    key={index}
                    onClick={() => setPathname(item as TPathname)}
                    className={classNames(styles.link, {
                        [styles.activeLink]: item === pathname
                    })}>
                    {item}
                    </div>
                })}
            </nav>
           {!isAuth && <div className={styles.authForm}>
                {formList.map((item) => {
                    if (item.type === "login" || item.type === "password" || (item.type === "passwordWithCheck"  && !checkPathname) || item.type === "email"){
                        let type: TypeInput = "text";
                        let view = false;
                        const mobileCheck = !checkPathname && windowSize > 1024;

                        if (item.type === "password" || item.type === "passwordWithCheck"){
                            type = String(user[item.type + "View"]) as TypeInput;
                            view = type === "password";
                        }
                        else {
                            type = item.type === "login" ? "text": item.type;
                        }

                        return <div key={item.id} className={styles.input}>
                            <Input
                            onFocus={mobileCheck ? () => handleView(item.type) : () => {}}
                            onBlur={mobileCheck ? handleBlur : () => {}}
                            key={item.id}
                            error={error ? true : false}
                            value={user[item.type]}
                            placeholder={String(item.text)}
                            type={type}
                            onChange={(e) => handleChange(e.target.value, item)}
                            style={{fontSize: "14px"}}
                            />
                            {
                            item.type === "password" || item.type === "passwordWithCheck" ?
                            <ViewEye
                            onMouseDown={() => handleMouse(item.type, false)}
                            onMouseUp={() => handleMouse(item.type, true)}
                            onTouchStart={(e) => handleTouch(e, item.type, type === "password")}
                            view={!view}
                            color={getThemeColor()}
                            />
                            : null

                            }

                            {windowSize < 1024 && !checkPathname && <div className={styles.question}>
                                <FaRegQuestionCircle color={item.type === "login" ?
                                validateFullLogin(String(user.login)) ? "#2fbd59" : "rgba(255, 0, 0, 0.596)" :
                                validateFullPasswords([String(user.password), String(user.passwordWithCheck)]) ? "#2fbd59": "rgba(255, 0, 0, 0.596)"}
                                cursor={"pointer"}
                                onClick={() => handleView(item.type)}
                                />
                            </div>}
                        </div>
                    } else if (item.type === "submit"){
                        return <Button
                        noActive={validateForm}
                        key={item.id}
                        onClick={() => handleSubmit(user)}
                        text={checkPathname && item.text ? item.text[0] : item.text && item.text[1]}
                        type={item.type}/>
                    } else if (item.type === "message") {
                        return <p
                        key={item.id}
                        style={{color: `${error ? "none": "red"}`}}
                        className={styles.messageText}>
                        {message}
                        </p>
                    }
                })}
            </div>}
            <div className={styles.close}>
                <IoCloseCircleOutline color={"green"} onClick={() => toggleOpen()} cursor={"pointer"} size={30}/>
            </div>
            {isAuth && <>
                <p>Вы уже авторизованы!</p>
                <div className={styles.exit}>
                    <Button onClick={() => handleActions("logout")} text="Выйти"/>
                </div>
            </>}
            {!isAuth  && <p className={styles.forgot}>Забыли пароль?</p>}
            {user.toggleTips && !checkPathname && <div ref={refFormTips} onBlur={windowSize < 1024 ? handleBlur: () => {}} tabIndex={0} className={styles.modal}>
                <FormTips value={user.toggleTipsValidate ? String(user.login): [String(user.password), String(user.passwordWithCheck)]} keyValidate={user.toggleTipsValidate ? "login": "password"}/>
            </div>}
        </form>}
    </div>}
    </>
}
