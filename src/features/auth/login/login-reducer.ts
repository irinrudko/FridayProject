import { Dispatch } from 'redux'
import { LoginParamsData, regAPI } from '../../../api/api'
import { AxiosError } from 'axios'

const initialState = {
    isLoggedIn: false,
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.isLoggedIn }
        default:
            return state
    }
}

export const loginTC = (data: LoginParamsData) => (dispatch: Dispatch<ActionsType>) => {
    regAPI
        .login(data)
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
        })
        .catch((err: AxiosError) => {
            //@ts-ignore
            let error = err.response.data.error
            if (error === 'not valid email/password /ᐠ-ꞈ-ᐟ\\') {
                alert(error)
            }
            if (error === 'user not found /ᐠ-ꞈ-ᐟ\\') {
                alert(error)
            }
        })
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', isLoggedIn } as const)

type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setIsLoggedInAC>
