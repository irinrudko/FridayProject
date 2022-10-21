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
    action: ActionType
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
    authAPI.me().then((response) =>
        dispatch(
            setUserData({
                name: response.data.name,
                email: response.data.email,
            })
        )
    )
}
export const updateUser =
    (userName: { name: string }): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI
            .changeNameOrImg(userName)
            .then(() => dispatch(setUserData(userName)))
            .catch((error: AxiosError) => {
                dispatch(setErrAC(error.message ? error.message : 'some error occurred'))
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
type ActionType = ReturnType<typeof setUserData>
