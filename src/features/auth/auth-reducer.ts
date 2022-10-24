import {
    authAPI,
    DataNewPasswordType,
    forgotPasswordAPI,
    ForgotPasswordDataType,
    LoginParamsData,
    UserData,
} from '../../api/userAPI'
import { setAppStatusAC, setErrAC } from '../../app/app-reducer'
import { AppRootStateType, AppThunk } from '../../app/store'
import { routes } from '../../app/routes/Routes'
import { dataType } from './auth-types'

const initialState = {
    isLoggedIn: false,
    email: '',
    registered: false,
    user: <UserData>{
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

export type AuthInitialStateType = typeof initialState

export const authReducer = (state: AuthInitialStateType = initialState, action: AuthActionsType): AuthInitialStateType => {
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
        authAPI
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
            .finally(() => dispatch(setAppStatusAC('idle')))
    }
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI
        .logout()
        .then((res) => {
            const user = {
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
            }
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setUserDataAC(user))
            dispatch(setIsLoggedInAC(false))
        })
        .catch((err: any) => {
            let error = err.response.data.error
            dispatch(setErrAC(error))
            dispatch(setAppStatusAC('failed'))
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
            dispatch(setIsLoggedInAC(false))
        })
}
export const forgotPassword =
    (emailValue: { email: string }, redirect: () => void): AppThunk =>
    (dispatch) => {
        const nameHost = document.location.host
        const data: ForgotPasswordDataType = {
            ...emailValue,
            from: '',
            message: `<div> 
password recovery link: <a href='http://${nameHost}/#${routes.newPassword}/$token$'>link</a>
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
            .catch((err: any) => {
                let error = err.response.data.error
                dispatch(setErrAC(error))
                dispatch(setAppStatusAC('failed'))
            })
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
            .catch((err: any) => {
                let error = err.response.data.error
                dispatch(setErrAC(error))
                dispatch(setAppStatusAC('failed'))
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }
export const registrationTC =
    (data: dataType): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI
            .registration(data.email, data.password)
            .then((res) => {
                //проверку сделать
                console.log(res)
                dispatch(isRegisteredAC(true))
            })
            .catch((err: any) => {
                let error = err.response.data.error
                dispatch(setErrAC(error))
                dispatch(setAppStatusAC('failed'))
            })
            .finally(() => {
                dispatch(setAppStatusAC('idle'))
            })
    }
export const updateUser =
    (userName: { name: string }): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const user = getState().auth.user
        const userUpdate = { ...user, ...userName }
        authAPI
            .changeNameOrImg(userName)
            .then(() => dispatch(setUserDataAC(userUpdate)))
            .catch((err: any) => {
                let error = err.response.data.error
                dispatch(setErrAC(error))
                dispatch(setAppStatusAC('failed'))
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }

//Types
export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setUserDataAC>
    | ReturnType<typeof setEmailRecovery>
    | ReturnType<typeof isRegisteredAC>
