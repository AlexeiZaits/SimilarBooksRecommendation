import { IBook } from "./book";
import { IUser } from "./user";

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: IUser,
}

export interface BooksResponse {
    data: Omit<IBook, "description">[],
    error: string,
    status: number,

}

export interface TitlesResponse{
    data: {
        titles: string[],
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
