import Skeleton from "@mui/material/Skeleton"
import { useState } from "react"
import styles from "./styles.module.scss"

export interface IImgWithSkeleton {
    width: number,
    height: number,
    link: string,
    errorLink: string,
    title: string,
}

export const ImgWithSkeleton = ({link, errorLink, title, width, height} :IImgWithSkeleton) => {
    const [error, setError] = useState(false)
    const [load, setLoad] = useState(false)

    return <>
        <img className={styles.img} style={{display: load ? "block" : "none",}}
        onLoad={() => setLoad(true)}
        onError={() => setError(true)}
        src={!error ? link : errorLink}  alt={title}/>
        {!load && <Skeleton sx={{ bgcolor: 'grey.400' }} variant="rectangular" width={width} height={height} />}
    </>
}
