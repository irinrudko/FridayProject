const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
}
type InitialStateType = typeof initialState


export const appReducer = (state: InitialStateType = initialState, action: ReducerActionType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.message}
        default:
            return state
    }
}


//AC
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setErrAC = (message: null | string) => ({type: "APP/SET-ERROR", message} as const)



//type
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type setErrType = ReturnType<typeof setErrAC>
export type ReducerActionType = ReturnType<typeof setAppStatusAC> | setErrType