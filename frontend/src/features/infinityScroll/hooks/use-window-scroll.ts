import { useFindMoreRecommend } from "features/recommendList/hooks/use-find-more-recommend";
import { useRecommendList } from "features/recommendList/hooks/use-recommend-list";
import { useSearch } from "features/search/hooks/use-search";
import { useEffect, useState } from "react";
import { useInfinityScroll } from "./use-infinity-scroll";
import { useClearInfinityScroll } from "./use-clear-infinity-scroll";

export const useWindowScroll = () => {
    const [request, setRequest] = useState(true)
    const [amountOffset, incrementAmountOffset] = useInfinityScroll()
    const [{status}, ] = useRecommendList()
    const findMoreBooks = useFindMoreRecommend()
    const [search, ] = useSearch()
    const clearInfitityScroll = useClearInfinityScroll()
    const limit = 24;

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const currentMaxScroll = documentHeight - windowHeight;
            console.log(amountOffset * limit)
            if (scrollTop + 240 > currentMaxScroll && !request) {
                setRequest(true)
                findMoreBooks({
                    "description": search,
                    "limit": limit,
                    "offset": limit*amountOffset,
                    "collection_name": "SimilarBooksService"
                })
                incrementAmountOffset()
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearInfitityScroll()
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
