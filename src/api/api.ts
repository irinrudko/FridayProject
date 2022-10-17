import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL:'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})


export const regAPI = {
    authRegistration(email: string, password: string) {
        return instance.post<RegistrationPayloadType, AxiosResponse<any>>(`auth/register`, {email, password})
    },
}

export const forgotPasswordAPI={
    forgotPassword(dataForgotPassword:ForgotPasswordDataType){
        return instance.post('auth/forgot',dataForgotPassword)
    },
    sendNewPassword(dataNewPassword:dataNewPasswordType){
        return instance.post('auth/set-new-password',dataNewPassword)
    }
}

//types
export type ResponseForgotPasswordAPIType={

}
export type dataNewPasswordType= {
    password: string
    resetPasswordToken: string|undefined
}
export type ForgotPasswordDataType={
    email: string
    from: string
    message: string
}
export type RegistrationPayloadType = {
    email: string,
    password: string
}