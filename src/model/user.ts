export interface IUser{
    email: string,
    password: string,
    credentials: ICredentials,
}

export interface ICredentials{
    refreshToken?: string,
    token?: string,
    firstName?: string,
    lastName?: string,
}