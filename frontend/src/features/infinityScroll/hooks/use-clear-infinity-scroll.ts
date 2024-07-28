import { useAppDispatch } from "app/store/store"
import { clearAmountOffset } from "../model/infinity-scroll-slice"

export const useClearInfinityScroll = () => {
    const dispatch = useAppDispatch()

    const clearInfinityScroll = () => dispatch(clearAmountOffset())

    return clearInfinityScroll
}
