import { IBook } from "./book";
import { IUser } from "./user";

export interface AuthResponse {
    access_token: string,
    refresh_token: string,
    user: IUser,
    login: string,
}

export interface RegResponse {
    message: string,
}

export interface BooksResponse {
    data: Omit<IBook, "description">[],
    error: string,
    status: number,

}

export interface TitlesResponse{
    data: {
        titles: string[],
        type: "search",
        status: number,
    }
}

export interface BookResponse{
    metadata: {
        "category": string,
        "author": string,
        "image": string,
        "info": string,
        "uid": string
    },
    "description": string,
    "status": number

}
