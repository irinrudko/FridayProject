import { AppThunk } from '../../../app/store'
import { setAppStatusAC, setErrAC } from '../../../app/app-reducer'
import { DataNewPasswordType, forgotPasswordAPI, ForgotPasswordDataType } from '../../../api/api'
import { AxiosError } from 'axios'
import { routes } from '../../../app/routes/Routes'

const forgotPasswordInitialState = {email: '' as string}


export const forgotPasswordReducer = (state: ForgotPasswordInitialStateType = forgotPasswordInitialState, action: ActionType): ForgotPasswordInitialStateType => {
    switch (action.type) {
        case "FORGOT-PASSWORD/SET-EMAIL-RECOVERY":{
            return {...state,email:action.value}
        }
        default:
            return state
    }
}
//action
const setEmailRecovery =(value:string )=>({type:'FORGOT-PASSWORD/SET-EMAIL-RECOVERY',value})

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


//types
type ForgotPasswordInitialStateType = typeof forgotPasswordInitialState
type ActionType = ReturnType<typeof setEmailRecovery>