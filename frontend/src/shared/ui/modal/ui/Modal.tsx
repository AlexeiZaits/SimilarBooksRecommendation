import React from "react"
import { createPortal } from "react-dom"
import styles from "./styles.module.scss"

export const withModal = (WrappedComponent) => {
    return class extends React.Component{
        constructor(props){
            super(props)
        }

        render(): React.ReactNode {
            return createPortal(<div className={styles.modal}>
                <WrappedComponent/>
            </div>, document.body)
        }
    }
}
