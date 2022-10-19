import { AppThunk } from '../../../app/store'
import { setAppStatusAC, setErrAC } from '../../../app/app-reducer'
import { DataNewPasswordType, forgotPasswordAPI, ForgotPasswordDataType } from '../../../api/api'
import { AxiosError } from 'axios'
import { routes } from '../../../app/routes/Routes'

const initialState = {}
type InitialStateType = typeof initialState
type ActionType = any

export const forgotPasswordReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

//thunk
export const forgotPassword =
    (emailValue: { email: string }, redirect: () => void): AppThunk =>
    (dispatch) => {
        const data: ForgotPasswordDataType = {
            ...emailValue,
            from: '',
            message: `<div> 
password recovery link: <a href='http://localhost:3000/#${routes.newPassword}/$token$'>link</a>
</div>`,
        }
        dispatch(setAppStatusAC('loading'))
        forgotPasswordAPI
            .forgotPassword(data)
            .then((response) => {
                redirect()
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
            .then((response) => {
                redirect()
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error: AxiosError) => dispatch(setErrAC(error.message ? error.message : 'some error occurred')))
            .finally(() => dispatch(setAppStatusAC('idle')))
    }
