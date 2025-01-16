import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss"
import classNames from "classnames";

interface ICollabsibleDescription{
    description: string,
}

export const CollabsibleDescription = ({description}: ICollabsibleDescription) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const accordionBodyRef = useRef<HTMLDivElement>(null)
    const [height, setHeigth] = useState(0)

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const [wrapperHeight, setWrapperHeight] = useState("auto");

    useEffect(() => {
        const accordionBody = accordionBodyRef.current;

        if (!accordionBody) return;
        
        const updateWrapperHeight = () => {
            if (!isExpanded){
                setTimeout(() => setWrapperHeight(`${height ? height: accordionBody.scrollHeight}px`), 450)
                !height && setHeigth(accordionBody.scrollHeight)
                
            } else {
                setWrapperHeight(`auto`); 
            }
        };
        
        updateWrapperHeight();

    }, [isExpanded]);
    console.log(height)
    return (<>
            <div className={classNames(
                styles.accordion,
                {[styles.hidden]: isExpanded},
                    )}>
                <div ref={accordionBodyRef} className={styles.accordionBody}>
                    <div
                    className={styles.accordionWrapper}
                    style={{ height: wrapperHeight }}
                    >
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
