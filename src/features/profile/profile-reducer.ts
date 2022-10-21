import { authAPI } from '../../api/api'
import { AppThunk } from '../../app/store'
import { setAppStatusAC, setErrAC } from '../../app/app-reducer'
import { AxiosError } from 'axios'

const profileInitialState = {
    name: '' as string,
    avatar: '' as string,
    email: '' as string,
}

export const profileReducer = (
    state: ProfileInitialStateType = profileInitialState,
    action: ProfileActionType
): ProfileInitialStateType => {
    switch (action.type) {
        case 'PROFILE/SET-USER-DATA': {
            return { ...state, ...action.data }
        }
        default:
            return state
    }
}

//action
export const setUserData = (data: UserDataType) => ({ type: 'PROFILE/SET-USER-DATA', data } as const)

//thunk
export const setProfileUserName = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI
        .me()
        .then((response) => {
            dispatch(
                setUserData({
                    name: response.data.name,
                    email: response.data.email,
                })
            )
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: any) => {
            let error = err.response.data.error
            dispatch(setErrAC(error))
            dispatch(setAppStatusAC('failed'))
        })
        .finally(() => dispatch(setAppStatusAC('idle')))
}
export const updateUser =
    (userName: { name: string }): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI
            .changeNameOrImg(userName)
            .then(() => dispatch(setUserData(userName)))
            .catch((err: any) => {
                let error = err.response.data.error
                dispatch(setErrAC(error))
                dispatch(setAppStatusAC('failed'))
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }

//types
export type UserDataType = {
    name?: string
    avatar?: string
    email?: string
}
type ProfileInitialStateType = typeof profileInitialState
export type ProfileActionType = ReturnType<typeof setUserData>
