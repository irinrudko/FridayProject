const initialState = {}
type InitialStateType = typeof initialState
type ActionType = any

export const loginReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}