import { LoginParamsData, regAPI, UserData } from '../../../api/api'
import { initializedAC, setAppStatusAC, setErrAC } from '../../../app/app-reducer'
import { AppThunk } from '../../../app/store'
import { AxiosError } from 'axios'

type InitialStateType = {
    isLoggedIn: boolean
    user: UserData
}

const initialState = {
    isLoggedIn: false,
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

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.isLoggedIn }
        case 'SET-USER-DATA':
            return { ...state, user: { ...action.user } }
        default:
            return state
    }
}

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
            if (res.status === 200) {
                dispatch(setIsLoggedInAC(false))
            }
        })
        .catch((err: AxiosError) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(initializedAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', isLoggedIn } as const)
export const setUserDataAC = (user: UserData) => ({ type: 'SET-USER-DATA', user } as const)

type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setUserDataAC>
