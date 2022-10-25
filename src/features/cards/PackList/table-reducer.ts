const initialState = {
    packId: '',
    userId: '',
}

export type CardsInitialStateType = typeof initialState

export const tableReducer = (state: CardsInitialStateType = initialState, action: CardsActionsType) => {
    switch (action.type) {
        case 'TABLE/SET-ID':
            return { ...state, packId: action.id, userId: action.userId }
        default:
            return state
    }
}

//Action creators
export const setIdAC = (id: string, userId: string) => ({ type: 'TABLE/SET-ID', id, userId } as const)

//Types
export type CardsActionsType = ReturnType<typeof setIdAC>
