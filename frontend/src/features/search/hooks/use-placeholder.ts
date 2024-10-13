import { useEffect, useState } from "react"
import { ErrorType } from "shared/types"

export const usePlaceholder = (cb: () => void, error: ErrorType): [
    string,
    (placeholder: string) => void
] => {
    const [placeholder, setPlaceholder] = useState("Поиск книг")

    useEffect(() => {
        if (!error){
            setPlaceholder("Поиск книг")
        } else if (error) {
            setPlaceholder(error)
            cb()
        }
    }, [error])

    return [placeholder, setPlaceholder]
}
