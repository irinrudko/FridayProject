import {AppThunk} from "../../../app/store";
import {regAPI} from "../../../api/api";
import {setAppStatusAC, setErrAC} from "../../../app/app-reducer";


const initialState = {
    registered: false
}
type InitialStateType = typeof initialState
type ActionType = ReturnType<typeof isRegisteredAC>

export const registrationReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "REG/REGISTERED":
            return {...state, registered: true}
        default:
            return state
    }
}

//Action creators
export const isRegisteredAC = (reg: boolean) => ({type: "REG/REGISTERED", reg} as const)

//Thunk creators
export const regTC = (data: dataType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    regAPI.authRegistration(data.email, data.password)
        .then((res) => {
            //проверку сделать
            console.log(res)
            dispatch(isRegisteredAC(true))
        })
        .catch((err: any) => {
            dispatch(setErrAC(err.response.data.error))
        })
        .finally(() =>{
            dispatch(setAppStatusAC('succeeded'))
        })
}


export type dataType = {
    email: string
    password: string
    confirmPassword: string
}