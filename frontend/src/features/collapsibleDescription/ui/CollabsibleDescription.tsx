import { useState } from "react";
import styles from "./styles.module.scss"
import classNames from "classnames";

interface ICollabsibleDescription{
    description: string,
}

export const CollabsibleDescription = ({description}: ICollabsibleDescription) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (<>
            <div className={classNames(
                styles.accordion,
                {[styles.hidden]: isExpanded},
                    )}>
                <div className={styles.accordionBody}>
                    <div>
                    <p className={styles.description}>
                        {description}
                    </p>
                    </div>
                </div>
            <button className={styles.button} onClick={toggleDescription}>
                {isExpanded ? "Скрыть" : "Далее"}
            </button>
            </div>
        </>
    );
}
