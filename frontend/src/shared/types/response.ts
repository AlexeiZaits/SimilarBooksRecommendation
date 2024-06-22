import { IUser } from "./user";

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: IUser,
}