import { RecommendList, InfinityScroll } from "features/index"
import { Wrapper } from "shared/ui"

export const RecommendPage = () => {
    return <Wrapper>
        <InfinityScroll>
            <RecommendList/>
        </InfinityScroll>
    </Wrapper>
}
