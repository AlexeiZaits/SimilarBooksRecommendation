import { useToggleWidjet } from "features/togglerWidjets/hooks/use-toggle-widget"
import { listWidgets } from "features/togglerWidjets/lib/listWidgets"
import { createPortal } from "react-dom"
import styles from "./styles.module.scss"
import { useAuthorization } from "features/authorization/hooks/use-authorization"
import { NavLink } from "react-router-dom"
import { useEffect, useRef } from "react"
import { useActionsAuthorization } from "features/authorization/hooks/use-actions-authorization"

export const Settings = () => {
    const [open, toggleOpen] = useToggleWidjet(listWidgets.settings)
    const [, user] = useAuthorization()
    const settingRef = useRef<HTMLDivElement>(null)
    const handleLogout = useActionsAuthorization()

    useEffect(() => {
        if (settingRef !== null && open){
            settingRef.current?.focus();
        }
    }, [settingRef, open])

    const handleBlur = () => {
        console.log("blur")
        setTimeout(() => {
            if (!settingRef.current?.contains(document.activeElement)) {
                toggleOpen();
            }
        }, 0)

    }

    return createPortal(<>
    {open && <div ref={settingRef} onBlur={handleBlur} tabIndex={0} className={styles.container}>
        <p className={styles.text}>Профиль</p>
        <p className={styles.text}>Никнейм: {user.name ? user.name: "неизвестный"}</p>
        <p className={styles.text}>Ранг: любитель книжек</p>
        {user.isAuth ?
        <p onClick={() => handleLogout("logout")} className={styles.text}>Выйти</p> :
        <div className={styles.links}>
            <NavLink className={styles.text} to="/authorization">Войти</NavLink>
        </div>
        }
    </div> }
    </>, document.body)
}
