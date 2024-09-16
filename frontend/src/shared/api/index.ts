import axios from "axios";
import { API_URL } from "../../config";
import { AuthResponse } from "shared/types";
import * as api from "../../config";

const $client = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$client.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$client.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === "401" && error.config && !error.config._isRetry){
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(api.resresh, {withCredentials: true})
            localStorage.setItem('token', response.data.access_token)
            return $client.request(originalRequest)
        } catch (error) {
            console.log({error: error, massage: "Не авторизован"})
        }
    }
    throw error;
})

export default $client
