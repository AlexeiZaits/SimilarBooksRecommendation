export const API_PORT = import.meta.env.VITE_BACKEND_PORT;
export const API_HOST = import.meta.env.VITE_BACKEND_HOST;
export const API_URL = `http://${API_HOST}:${API_PORT}/`;

export const authUser = API_URL + `auth/login`;
export const regUser = API_URL + `auth/register`;
export const logout = API_URL + `auth/logout`;
export const resresh = API_URL + `auth/user`;
export const searchBooks = (query:string, limit: number, offset: number) => API_URL + `recsys/get_book_recommendations?query=${query}&limit=${limit}&offset=${offset}`;
export const get_titles_books = (query:string, limit?: number) => API_URL + `app/update_query?query=${query}&limit=${limit}`;
export const get_book = (title: string) =>  API_URL + `app/book?title=${title}`;
export const get_books = (offset:number, limit: number, categoryFilter: string | null) => API_URL + `app/books?offset=${offset}&limit=${limit}&category_filter=${categoryFilter === "Все книги"? "": categoryFilter}`;
