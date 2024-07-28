import { useAppDispatch, useAppSelector } from "app/store/store"
import { incrementAmountOffset } from "../model/infinity-scroll-slice"
import { selectAmountOffset } from "../model/infinity-scroll-selectors"

export const useInfinityScroll = (): [number, () => void] => {
    const dispatch = useAppDispatch()
    const amountOffset = useAppSelector(selectAmountOffset)

    const incrementInfinityScroll = () => dispatch(incrementAmountOffset())

    return [amountOffset, incrementInfinityScroll]
}
