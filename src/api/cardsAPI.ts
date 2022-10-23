import { AxiosResponse } from 'axios'
import { instance } from './instance'

export const cardsAPI = {
    getCards(params: GetCardParams) {
        return instance.get<GetCardParams, AxiosResponse<GetCardsResponseType>>('cards/card', { params }).then(({ data }) => data)
    },
    createCard(cardData: CreateCardData) {
        return instance.post<CreateCardData, AxiosResponse<CreateCardResponseType>>('cards/card', cardData)
    },
    removeCard(id: string) {
        return instance.delete<AxiosResponse<RemoveCardResponseType>>(`cards/card?id=${id}`)
    },
    updateCard(updateCardData: UpdateCardData) {
        return instance.put<AxiosResponse<UpdateCardResponseType>>('cards/card', updateCardData)
    },
}

// cardsAPI types

export type CardType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    questionImg: string
    answerImg: string
    answerVideo: string
    questionVideo: string
    comments: string
    type: string
    rating: number
    more_id: string
    created: Date | null
    updated: Date | null
    __v: number
}
export type GetCardParams = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type GetCardsResponseType = {
    cards: CardType[]
    packUserId: string
    packName: string
    packPrivate: boolean
    packDeckCover: string
    packCreated: Date | null
    packUpdated: Date | null
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}
export type CreateCardData = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}
export type CreateCardResponseType = {
    newCard: CardType
    token: string
    tokenDeathTime: number
}
export type RemoveCardResponseType = {
    deletedCard: CardType
    token: string
    tokenDeathTime: number
}
export type UpdateCardData = {
    _id: string
    question?: string
    answer?: string
    comments?: string
}
export type UpdateCardResponseType = {
    updatedCard: CardType
    token: string
    tokenDeathTime: number
}
