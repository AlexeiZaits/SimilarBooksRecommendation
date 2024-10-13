import { useParams } from "react-router-dom"
import { fixLink } from "entities/book/lib/fixLink";
import { ImgWithSkeleton, withModal, Preloader } from "shared/ui";
import styles from "./styles.module.scss"
import { useGetData } from "../hook/useGetData";
import { Like } from "features/index";
import { Carusel } from "widjets/carusel";
import { BookResponse } from "shared/types";
import { fixInfo } from "../lib/fixInfo";
import * as API from "../../../config"
import { decodeLink } from "features/recommendList/hooks/use-category-books";
// import Rating from "@mui/material/Rating";


const PreloaderWithModal = withModal(Preloader)
export type BodyRequest = string


export const BookPage = () => {
    const {title} = useParams();
    const titleRequest = title ? title : ""
    const {data, loading, error} = useGetData<BookResponse, BodyRequest>(API.get_book(decodeLink(titleRequest)), titleRequest)


    return <>
        {loading && <PreloaderWithModal/>}
        {data !== null && <div className={styles.container}>
            <div className={styles.book}>
                <div className={styles.img}>
                    <Like title={titleRequest} category={data.metadata.category} image_link={data.metadata.image} score={0} author={data.metadata.author} uid={data.metadata.uid}/>
                    <ImgWithSkeleton errorLink={"https://www.podpisnie.ru/upload/no-image.png"} height={590} width={410} link={"https://www.podpisnie.ru/" + fixLink(data.metadata.image)} title={title ? title : "книга"}/>
                </div>
                <div className={styles.info}>
                    <h1 className={styles.mainTitle}>{decodeLink(titleRequest)}</h1>
                    {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
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
