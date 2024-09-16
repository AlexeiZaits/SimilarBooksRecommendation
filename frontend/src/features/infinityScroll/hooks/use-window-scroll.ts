import { useFindMoreRecommend } from "features/recommendList/hooks/use-find-more-recommend";
import { useRecommendList } from "features/recommendList/hooks/use-recommend-list";
import { useEffect, useState } from "react";
import { useInfinityScroll } from "./use-infinity-scroll";
import { useParams, useSearchParams } from "react-router-dom";

export const useWindowScroll = () => {
    const [searchParams, ] = useSearchParams()
    const search = searchParams.get("search")
    const [amountOffset, incrementAmountOffset] = useInfinityScroll()
    const findMoreBooks = useFindMoreRecommend()
    const [{status}, ] = useRecommendList()
    const [request, setRequest] = useState(true)
    const limit = 21;
    const {category} = useParams()

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const currentMaxScroll = documentHeight - windowHeight;

            if (scrollTop + 600 > currentMaxScroll && !request && status !== "loading") {
                setRequest(true)
                findMoreBooks({
                    "query": search ? search: "",
                    "limit": limit,
                    "offset": limit*amountOffset,
                    "category": category

                })
                incrementAmountOffset()
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {

            window.removeEventListener('scroll', handleScroll);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [request, status])

    useEffect(() => {
        if (status === "received"){
            setRequest(false)
        }
    }, [status])

}
