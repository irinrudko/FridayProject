import { AppThunk } from './store'
import { authAPI } from '../api/api'
import { AxiosError } from 'axios'
import { setIsLoggedInAC } from '../features/auth/auth-reducer'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    initialized: true,
}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.message }
        case 'APP/INITIALIZED':
            return { ...state, initialized: action.initializedStatus }
        default:
            return state
    }
}

//ActionC
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setErrAC = (message: null | string) => ({ type: 'APP/SET-ERROR', message } as const)
export const initializedAC = (initializedStatus: boolean) => ({ type: 'APP/INITIALIZED', initializedStatus } as const)

//ThunkC
export const initializedTC = (): AppThunk => (dispatch) => {
    // debugger
    dispatch(setAppStatusAC('loading'))
    dispatch(initializedAC(false))
    authAPI
        .me()
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(initializedAC(true))
            dispatch(setAppStatusAC('idle'))
        })
}

//type
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type setErrType = ReturnType<typeof setErrAC>
export type AppActionType = ReturnType<typeof setAppStatusAC> | setErrType | ReturnType<typeof initializedAC>
