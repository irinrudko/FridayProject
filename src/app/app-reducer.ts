import { AppThunk } from './store'
import { regAPI } from '../api/api'
import { AxiosError } from 'axios'
import {setIsLoggedInAC} from "../features/auth/login/login-reducer";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    initialized: true,
}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ReducerActionType): InitialStateType => {
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
    regAPI
        .me()
        .then((res) => {
            // debugger
            if(res.status === 200){
                dispatch(setIsLoggedInAC(true))
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

//type
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type setErrType = ReturnType<typeof setErrAC>
export type ReducerActionType = ReturnType<typeof setAppStatusAC> | setErrType | ReturnType<typeof initializedAC>
