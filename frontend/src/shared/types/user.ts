export interface IUser {
    isActivated: boolean,
    id: string | null,
}

export interface IUserForm {
    login: string,
    password: string,
}