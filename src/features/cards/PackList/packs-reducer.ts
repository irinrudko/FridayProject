import { CreateNewPackData, GetPackParams, GetPacksResponseType, packsAPI, PackType } from '../../../api/packsAPI'
import { AppRootStateType, AppThunk } from '../../../app/store'
import { setAppStatusAC } from '../../../app/app-reducer'

const initialState = {
    cardPacks: [
        {
            _id: '',
            user_id: '',
            user_name: '',
            private: false,
            name: '',
            path: '',
            grade: 0,
            shots: 0,
            deckCover: '',
            cardsCount: 0,
            type: '',
            rating: 0,
            created: null,
            updated: '',
            more_id: '',
            __v: 0,
        },
    ] as PackType[],
    page: 1,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
}

export type PacksInitialStateType = typeof initialState

export const packsReducer = (state: PacksInitialStateType = initialState, action: PacksActionsType): PacksInitialStateType => {
    switch (action.type) {
        case 'PACKS/GET-PACKS':
            return { ...action.packs }
        case 'PACKS/RESET-PACKS': {
            const initialValue = {
                cardPacks: [
                    {
                        _id: '',
                        user_id: '',
                        user_name: '',
                        private: false,
                        name: '',
                        path: '',
                        grade: 0,
                        shots: 0,
                        deckCover: '',
                        cardsCount: 0,
                        type: '',
                        rating: 0,
                        created: null,
                        updated: '',
                        more_id: '',
                        __v: 0,
                    },
                ] as PackType[],
                page: 1,
                pageCount: 0,
                cardPacksTotalCount: 0,
                minCardsCount: 0,
                maxCardsCount: 0,
                token: '',
                tokenDeathTime: 0,
            }
            return initialValue
        }
        default:
            return state
    }
}

//Action creators
export const getPacksAC = (packs: GetPacksResponseType) => ({ type: 'PACKS/GET-PACKS', packs } as const)
export const resetPackAC = () => ({ type: 'PACKS/RESET-PACKS' } as const)

// Thunks
export const getPacksTC =
    (params?: GetPackParams): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        packsAPI
            .getPacks(params!)
            .then((res) => {
                dispatch(getPacksAC(res))
            })
            .catch((err: any) => {
                let error = err.response.data.error
                console.log('catch, error:', error)
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }

export const updatePackTC =
    (id: string, name: string, deckCover: string, isPrivate?: boolean, params?: GetPackParams): AppThunk =>
    (dispatch) => {
        packsAPI.updatePack(id, name, deckCover, isPrivate!).then(() => {
            dispatch(getPacksTC(params))
        })
    }

export const removePackTC =
    (id: string): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const params = getState().setting
        packsAPI
            .removePack(id)
            .then(() => {
                dispatch(getPacksTC(params))
            })
            .catch((err: any) => {
                let error = err.response.data.error
                console.log('catch, error:', error)
            })
    }

export const addPackTC =
    (newPack: CreateNewPackData): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const params = getState().setting
        packsAPI
            .createPack(newPack)
            .then(() => {
                dispatch(getPacksTC(params))
            })
            .catch((err: any) => {
                let error = err.response.data.error
                console.log('catch, error:', error)
            })
    }

//Types
export type PacksActionsType = ReturnType<typeof getPacksAC> | ReturnType<typeof resetPackAC>
