import { DataNewPasswordType, forgotPasswordAPI, ForgotPasswordDataType, LoginParamsData, regAPI, UserData } from '../../api/api'
import { initializedAC, setAppStatusAC, setErrAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { AxiosError } from 'axios'
import { routes } from '../../app/routes/Routes'
import { dataType } from './auth-types'

export type LoginInitialStateType = {
    isLoggedIn: boolean
    user: UserData
    email: string
    registered: boolean
}
const initialState = {
    isLoggedIn: false,
    email: '',
    registered: false,
    user: {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,
        created: null,
        updated: null,
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: '',
    },
}

export const authReducer = (state: LoginInitialStateType = initialState, action: ActionsType): LoginInitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.isLoggedIn }
        case 'AUTH/SET-USER-DATA':
            return { ...state, user: { ...action.user } }
        case 'AUTH/SET-EMAIL-RECOVERY': {
            return { ...state, email: action.value }
        }
        case 'AUTH/REGISTERED':
            return { ...state, registered: true }
        default:
            return state
    }
}

//Action creators
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({ type: 'AUTH/SET-IS-LOGGED-IN', isLoggedIn } as const)
export const setUserDataAC = (user: UserData) => ({ type: 'AUTH/SET-USER-DATA', user } as const)
export const setEmailRecovery = (value: string) => ({ type: 'AUTH/SET-EMAIL-RECOVERY', value } as const)
export const isRegisteredAC = (reg: boolean) => ({ type: 'AUTH/REGISTERED', reg } as const)

//Thunk
export const loginTC =
    (data: LoginParamsData): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        regAPI
            .login(data)
            .then((res) => {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setUserDataAC(res))
            })
            .catch((err: any) => {
                let error = err.response.data.error
                dispatch(setErrAC(error))
                dispatch(setAppStatusAC('failed'))
            })
    }
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    regAPI
        .logout()
        .then((res) => {
            dispatch(setIsLoggedInAC(false))
        })
        .catch((err: any) => {
            let error = err.response.data.error
            dispatch(setErrAC(error))
            dispatch(setAppStatusAC('failed'))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsLoggedInAC(false))
        })
}
export const forgotPassword =
    (emailValue: { email: string }, redirect: () => void): AppThunk =>
    (dispatch) => {
        const namehost = document.location.host
        const data: ForgotPasswordDataType = {
            ...emailValue,
            from: '',
            message: `<div> 
password recovery link: <a href='http://${namehost}/#${routes.newPassword}/$token$'>link</a>
</div>`,
        }
        dispatch(setAppStatusAC('loading'))
        forgotPasswordAPI
            .forgotPassword(data)
            .then(() => {
                redirect()
                dispatch(setEmailRecovery(emailValue.email))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error: AxiosError) => dispatch(setErrAC(error.message ? error.message : 'some error occurred')))
            .finally(() => dispatch(setAppStatusAC('idle')))
    }
export const newPassword =
    (dataNewPassword: DataNewPasswordType, redirect: () => void): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        forgotPasswordAPI
            .sendNewPassword(dataNewPassword)
            .then(() => {
                redirect()
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error: AxiosError) => dispatch(setErrAC(error.message ? error.message : 'some error occurred')))
            .finally(() => dispatch(setAppStatusAC('idle')))
    }
export const regTC =
    (data: dataType): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        regAPI
            .authRegistration(data.email, data.password)
            .then((res) => {
                //проверку сделать
                console.log(res)
                dispatch(isRegisteredAC(true))
            })
            .catch((err: any) => {
                dispatch(setErrAC(err.response.data.error))
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }

//Types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setUserDataAC>
    | ReturnType<typeof setEmailRecovery>
    | ReturnType<typeof isRegisteredAC>
