import { useAppDispatch, useAppSelector } from "app/store/store"
import { toggleWidjet } from "../model/toggler-widjets-slice"

export const useToggleWidjet = (key: string): [
    boolean,
    () => void
] => {
    const dispatch = useAppDispatch()
    const wigjet = useAppSelector(state => state.togglerWidger)

    const togglerWidjet = () => dispatch(toggleWidjet({key: key}))

    return [wigjet[key], togglerWidjet]
}
