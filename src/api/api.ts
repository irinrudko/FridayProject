import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})


export const regAPI = {
    authRegistration(email: string, password: string) {
        return instance.post<RegistrationPayloadType, AxiosResponse<any>>(`auth/register`, {email, password})
    },
    me() {
        return instance.post<AxiosResponse<ResponseAuth>>(`auth/register`)
    },
}

//types

export type RegistrationPayloadType = {
    email: string,
    password: string
}

export type ResponseAuth = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}