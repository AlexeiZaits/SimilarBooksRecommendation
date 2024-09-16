export const API_URL = 'http://127.0.0.1:8000/';

export const authUser = API_URL + `auth/login`;
export const regUser = API_URL + `auth/register`;
export const logout = API_URL + `auth/logout`;
export const resresh = API_URL + `auth/user`;
export const searchBooks = (query:string, limit: number, offset: number) => API_URL + `recsys/get_book_recommendations?query=${query}&limit=${limit}&offset=${offset}`;
export const get_titles_books = (query:string, limit?: number) => API_URL + `app/update_query?query=${query}&limit=${limit}`;
export const get_book = (title: string) =>  API_URL + `app/book?title=${title}`;
export const get_books = (offset:number, limit: number, categoryFilter: string | null) => API_URL + `app/books?offset=${offset}&limit=${limit}&category_filter=${categoryFilter === null? "": categoryFilter}`;
