export const API_URL = 'https://backend/api/';

export const authUser = API_URL + `login`
export const logout = API_URL + `logout`
export const resresh = API_URL + `resresh`
export const searchBooks = (search:string) => API_URL + `search?${search}`
