const initialState = {}
type InitialStateType = typeof initialState
type ActionType = any

export const registrationReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}