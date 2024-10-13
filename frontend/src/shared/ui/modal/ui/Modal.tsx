import React, { ComponentType } from "react"
import { createPortal } from "react-dom"
import styles from "./styles.module.scss"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withModal = (WrappedComponent: ComponentType, width?: number, height?: number, backgroundColor?: string) => {
    return class Modal extends React.Component{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(props: any){
            super(props)
        }

        render(): React.ReactNode {
            return createPortal(<div data-testid="withModal" style={{width: width+"px", height: height+"px", backgroundColor: backgroundColor}} className={styles.modal}>
                <WrappedComponent/>
            </div>, document.body)
        }
    }
}
