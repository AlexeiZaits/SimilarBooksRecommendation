import { ReactNode } from "react";
import { useWindowScroll } from "../hooks/use-window-scroll";

interface IScroll {
    children: ReactNode
}

export const InfinityScroll = ({children}:IScroll) => {

    useWindowScroll()

    return <>
        {children}
    </>
}
