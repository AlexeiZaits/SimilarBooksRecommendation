import { smoothScrollHigh } from "features/search/lib/smoothScrollHigh"
import { Button } from "shared/ui"
import styles from "./styles.module.scss"

export const ScrollTop = () => {

    return <div className={styles.container}>
        <Button style={{width: "100%"}} onClick={smoothScrollHigh} >&#8593;</Button>
    </div>
}
