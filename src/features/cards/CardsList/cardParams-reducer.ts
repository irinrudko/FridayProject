import { GetCardParams } from '../../../api/cardsAPI'

const initialStateCardParams = {
    cardsPack_id: '',
    cardAnswer: '',
    cardQuestion: '',
    min: 0,
    max: 110,
    sortCards: '',
    page: 1,
    pageCount: 8,
}

export type InitialStateCardParamsType = typeof initialStateCardParams

export const cardParms = (
    state: InitialStateCardParamsType = initialStateCardParams,
    action: CardParamsActionsType
): InitialStateCardParamsType => {
    switch (action.type) {
        case 'CARD/SET-CARD-PARAMS': {
            return { ...state, ...action.setting }
        }
        default:
            return state
    }
}

//Action creators

export const setCardParams = (setting: GetCardParams) => ({ type: 'CARD/SET-CARD-PARAMS', setting } as const)

//Types
export type CardParamsActionsType = ReturnType<typeof setCardParams>
