import { useFindMoreRecommend } from "features/recommendList/hooks/use-find-more-recommend";
import { useRecommendList } from "features/recommendList/hooks/use-recommend-list";
import { useSearch } from "features/search/hooks/use-search";
import { useEffect, useState } from "react";
import { useInfinityScroll } from "./use-infinity-scroll";

export const useWindowScroll = () => {
    const [search, ] = useSearch()
    const [amountOffset, incrementAmountOffset] = useInfinityScroll()
    const findMoreBooks = useFindMoreRecommend()
    const [{status}, ] = useRecommendList()
    const [request, setRequest] = useState(true)
    const limit = 24;

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const currentMaxScroll = documentHeight - windowHeight;

            if (scrollTop + 240 > currentMaxScroll && !request && status !== "loading") {
                setRequest(true)
                findMoreBooks({
                    "query": search,
                    "limit": limit,
                    "offset": limit*amountOffset,
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
