import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const regAPI = {
    authRegistration(email: string, password: string) {
        return instance.post<RegistrationPayloadType, AxiosResponse<any>>(`auth/register`, { email, password })
    },
    me() {
        return instance.post<AxiosResponse<UserData>>(`auth/me`)
    },
    login(data: LoginParamsData) {
        return instance.post<LoginParamsData, AxiosResponse<UserData>>('auth/login', data).then((response) => response.data)
    },
    logout() {
        return instance.delete<AxiosResponse<LogoutResponseType>>(`auth/me`)
    },
}

//types

export type RegistrationPayloadType = {
    email: string
    password: string
}

export type LoginParamsData = {
    email: string
    password: string
    rememberMe: boolean
}

export type UserData = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date | null
    updated: Date | null
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

export type LogoutResponseType ={
    info: string
    error: string
}
