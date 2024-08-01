import { IBook } from "./book";
import { IUser } from "./user";

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: IUser,
}

export interface BooksResponse {
    data: {
        data: Omit<IBook, "description">[],
        error: string,
        status: number,
    }
}

export interface TitlesResponse{
    data: {
        titles: string[],
        status: number,
    }
}
