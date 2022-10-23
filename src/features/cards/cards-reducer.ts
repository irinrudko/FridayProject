import { cardsAPI, CardType, CreateCardData, GetCardParams, GetCardsResponseType, UpdateCardData } from '../../api/cardsAPI'
import { AppThunk } from '../../app/store'

const initialState = {
    cards: <CardType[]>[
        {
            _id: '',
            cardsPack_id: '',
            user_id: '',
            answer: '',
            question: '',
            grade: 0,
            shots: 0,
            questionImg: '',
            answerImg: '',
            answerVideo: '',
            questionVideo: '',
            comments: '',
            type: '',
            rating: 0,
            more_id: '',
            created: null,
            updated: null,
            __v: 0,
        },
    ],
    packUserId: '',
    packName: '',
    packPrivate: false,
    packDeckCover: '',
    packCreated: null,
    packUpdated: null,
    page: 1,
    pageCount: 4,
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    token: '',
    tokenDeathTime: 0,
}

export type CardsInitialStateType = typeof initialState

export const cardsReducer = (state: CardsInitialStateType = initialState, action: CardsActionsType) => {
    switch (action.type) {
        case 'CARDS/GET-CARDS':
            return { ...action.cards }
        default:
            return state
    }
}

//Action creators
export const getCardsAC = (cards: GetCardsResponseType) => ({ type: 'CARDS/GET-CARDS', cards } as const)

// Thunks
export const getCardsTC =
    (params: GetCardParams): AppThunk =>
    (dispatch) => {
        cardsAPI
            .getCards(params)
            .then((res) => {
                dispatch(getCardsAC(res))
            })
            .catch((err: any) => {
                let error = err.response.data.error
                console.log('catch, error:', error)
            })
    }

export const updateCardTC =
    (updateCardData: UpdateCardData, params: GetCardParams): AppThunk =>
    (dispatch) => {
        cardsAPI
            .updateCard(updateCardData)
            .then(() => {
                dispatch(getCardsTC(params))
            })
            .catch((err: any) => {
                let error = err.response.data.error
                console.log('catch, error:', error)
            })
    }

export const removeCardTC =
    (id: string, params: GetCardParams): AppThunk =>
    (dispatch) => {
        cardsAPI
            .removeCard(id)
            .then(() => {
                dispatch(getCardsTC(params))
            })
            .catch((err: any) => {
                let error = err.response.data.error
                console.log('catch, error:', error)
            })
    }
export const addCardTC =
    (cardData: CreateCardData, params: GetCardParams): AppThunk =>
    (dispatch) => {
        cardsAPI
            .createCard(cardData)
            .then(() => {
                dispatch(getCardsTC(params))
            })
            .catch((err: any) => {
                let error = err.response.data.error
                console.log('catch, error:', error)
            })
    }

//Types
export type CardsActionsType = ReturnType<typeof getCardsAC>
