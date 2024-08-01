import { useEffect } from "react"

interface ILikeLocal {
    like: boolean,
    uid: string,
}

export const useLikeLocal = ({like, uid}:ILikeLocal) => {
    useEffect(()=> {
        like ? localStorage.setItem(`book?${uid}`, JSON.stringify({uidx: uid})) : localStorage.removeItem(`book?${uid}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [like])
}
