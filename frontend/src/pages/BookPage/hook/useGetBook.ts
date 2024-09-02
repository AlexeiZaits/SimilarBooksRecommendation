import axios from "axios";
import { useEffect, useState } from "react";

export const useGetData = <DataResponse = null, Dependicies = null, BodyRequest = string,>(
request: string,
dependicies : Dependicies,
bodyRequest?: BodyRequest,
):{
data: DataResponse | null,
loading:boolean,
error: boolean
} => {
    const [data, setData] = useState<DataResponse | null>(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.post(request, bodyRequest)
        .then((data) => {
            if (data.data.status === 1001){
                setError(true)
            } else{
                setData(data.data)
            }
        })
        .catch((error) => {
            throw new Error(error)
        })
        .finally(() => setLoading(false))

        return () => {
            setData(null)
            setLoading(false)
            setError(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependicies === null ? [] : [dependicies])



    return {data: data, loading: loading, error: error}
}
