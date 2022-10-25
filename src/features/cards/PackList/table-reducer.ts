const initialState = {
    packId: '',
}

export type CardsInitialStateType = typeof initialState

export const tableReducer = (state: CardsInitialStateType = initialState, action: CardsActionsType) => {
    switch (action.type) {
        case 'TABLE/SET-ID':
            return { ...state, packId: action.id }
        default:
            return state
    }
}

//Action creators
export const setIdAC = (id: string) => ({ type: 'TABLE/SET-ID', id } as const)

//Types
export type CardsActionsType = ReturnType<typeof setIdAC>
