import axios, {AxiosResponse} from 'axios'


const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})


export const regAPI = {
    authRegistration(email: string, password: string) {
        return instance.post<RegistrationPayloadType, AxiosResponse<any>>(`auth/register`, {email, password})
    },
}

//types

export type RegistrationPayloadType = {
    email: string,
    password: string
}