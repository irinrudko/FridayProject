import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const regAPI = {
    authRegistration(email: string, password: string) {
        return instance.post<RegistrationPayloadType, AxiosResponse<any>>(`auth/register`, { email, password })
    },
    login(data: LoginParamsData) {
        return instance
            .post<LoginParamsData, AxiosResponse<LoginResponseType>>('auth/login', data)
            .then((response) => response.data)
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

type LoginResponseType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: Date | string
    updated: Date | string
    __v: number
    token: string
    tokenDeathTime: number
    avatar: string
}
