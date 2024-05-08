export interface userSignup {
    username: string,
    email_id: string,
    password: string,
    fullname: string
}

export interface userInfo {
    username: string,
    email_id: string,
}

export interface loginCredentials extends userInfo {
    password: string
}

export interface changePasswordCredentials extends loginCredentials {
    newPassword: string
}

export interface authStatus {
    validUser: boolean,
    token: string | null,
    message: string | null
}

