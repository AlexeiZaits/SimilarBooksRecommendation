export interface IUser {
    isActivated: boolean,
    id: string | null,
}

export interface IFormInput {
    value: string,
    view: boolean
}

export interface IUserForm {
    [key: string]: string | boolean
}
