import { useParams } from "react-router-dom";
import { useRecommendList } from "./use-recommend-list";
import { useEffect } from "react";

export const decodeLink = (link: string) => {
    return link.replace(/-или-/g, "/")
}

export const useCategoryBooks = () => {
    const [,getBooks] = useRecommendList()
    const {category} = useParams();

    useEffect(() => {
        if(category){
            getBooks({
                query: category.replace(/-или-/g, "/"),
                limit: 24,
                offset: 0,
        }, "get")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])
}
