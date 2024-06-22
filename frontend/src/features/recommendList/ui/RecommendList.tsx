import { PreloaderModal } from "shared/ui/preloaderModal/ui/Preloader"
import { useRecommendList } from "../hook/use-recommend-list"
import { Book } from "entities/index"

export const RecommendList = () => {
    const [{status, qty, error, books},] = useRecommendList()
    
    return <div>
        {status === "loading" && <PreloaderModal/>}
        {error && <span>Error fetch data</span>}
        {/* {qty && books.map((item) => {
            return <Book {...item}/>
        })} */}
        <Book author="LEAH PRICE" title="THE ANTHOLOGY AND THE RISE OF THE NOVEL"/>
    </div>
}
