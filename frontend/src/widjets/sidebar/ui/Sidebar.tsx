import { useToggleWidjet } from "features/togglerWidjets/hooks/use-toggle-widget"
import { listWidgets } from "features/togglerWidjets/lib/listWidgets"
import { NavLink } from "react-router-dom"
import styles from "./styles.module.scss"
import Drawer from "@mui/material/Drawer/Drawer";
import styled from "@mui/material/styles/styled";
import { useClearInfinityScroll } from "features/infinityScroll/hooks/use-clear-infinity-scroll";
import dataJson from "../../../../data.json"

const CustomDrawer = styled(Drawer)(() => ({
    '& .MuiDrawer-paper': {
        borderTopRightRadius: '16px',
        borderBottomRightRadius: '16px',
        borderTopRightColor: 'black',
    },
}));

export const fixNavigateLink = (link: string) => {
    return link.replace(/\//g, "-или-")
}

export const Sidebar = () => {
    const [open, toggleOpen] = useToggleWidjet(listWidgets.sidebar)
    const clearInfinityScroll = useClearInfinityScroll()

    const menu: MenuType = dataJson.menu

    const handleClick = () => {
        clearInfinityScroll()
        toggleOpen()
    }

    type MenuType = {
        [key: string]: string;
    };

    return <CustomDrawer open={open} onClose={toggleOpen}>
        <div className={styles.container}>
            <nav className={styles.nav}>
                {Object.keys(menu).map((item, index) => {
                    const link = `/books/${menu[item].replace(/\//g, "-или-")}`

                    return <NavLink
                    key={index}
                    onClick={handleClick}
                    to={link}
                    className={({ isActive, isPending }) =>
                        isPending ? styles.link : isActive ? styles.active : styles.link

                    }
                    >
                    {menu[item]}
                    </NavLink>
                })}
            </nav>
        </div>
    </CustomDrawer>
}
