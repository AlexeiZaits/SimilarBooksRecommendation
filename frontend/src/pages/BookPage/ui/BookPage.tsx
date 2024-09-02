import { useParams } from "react-router-dom"
import { fixLink } from "entities/book/lib/fixLink";
import { ImgWithSkeleton, withModal, Preloader } from "shared/ui";
import styles from "./styles.module.scss"
import { useGetData } from "../hook/useGetBook";
import { Like } from "features/index";
import { Carusel } from "widjets/carusel";
import { BookResponse } from "shared/types";
import { fixInfo } from "../lib/fixInfo";
import * as API from "../../../config"

const PreloaderWithModal = withModal(Preloader)

export interface BodyRequest {
    title: string
}

export const BookPage = () => {
    const {title} = useParams();
    const {data, loading, error} = useGetData<BookResponse, string, BodyRequest>(API.get_book, title ? title : "",  {title: title ? title: ""})

    return <>
        {loading && <PreloaderWithModal/>}
        {data !== null && <div className={styles.container}>
            <div className={styles.book}>
                <>
                    <div className={styles.img}>
                        <ImgWithSkeleton errorLink={"https://www.podpisnie.ru/upload/no-image.png"} height={590} width={410} link={"https://www.podpisnie.ru/" + fixLink(data.metadata.image)} title={title ? title : "книга"}/>
                    </div>
                </>
                <div className={styles.info}>
                    <h1 className={styles.mainTitle}>{title}</h1>
                    <div className={styles.like}>
                        <Like title={title ? title : ""} category={data.metadata.category} image_link={data.metadata.image} score={0} author={data.metadata.author} uid={data.metadata.uid}/>
                    </div>
                    <h2 className={styles.secondaryTitle}>О книге</h2>
                    <p className={styles.text}>Категория {data.metadata.category}</p>
                    {Object.values(fixInfo(data.metadata.info)).map((item, index)=> {
                        return <p key={index} className={styles.text}>{item}</p>
                    })}
                </div>
            </div>
            <div className={styles.description}>
                <h2 className={styles.mainTitle}>Описание: </h2>
                <p className={styles.text}>{data.description}</p>
            </div>
            <h1 className={styles.recommendTitle}>Рекомендуем к прочтению</h1>
            <Carusel/>
        </div>}
        {error && <span>Произошла ошибка</span>}
    </>
}
