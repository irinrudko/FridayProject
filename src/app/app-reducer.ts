const initialState = {}
type InitialStateType = typeof initialState
type ActionType = any

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}