import { AxiosResponse } from 'axios'
import { instance } from './instance'

export const packsAPI = {
    getPacks(params: GetPackParams) {
        return instance.get<GetPackParams, AxiosResponse<GetPacksResponseType>>('cards/pack', { params }).then(({ data }) => data)
    },
    createPack(newPack: CreateNewPackData) {
        return instance.post<CreateNewPackData, AxiosResponse<CreatePacksResponseType>>('cards/pack', newPack)
    },
    removePack(id: string) {
        return instance.delete<AxiosResponse<RemovePackResponseType>>(`cards/pack?id=${id}`)
    },
    changePackName(id: string, name: string) {
        return instance.put<AxiosResponse<ChangePackNameResponseType>>('cards/pack', { id, name })
    },
}

// packsAPI types
export type PackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: Date | null
    updated: string
    more_id: string
    __v: number
}
export type GetPackParams = {
    user_id?: string
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    block?: boolean
}
export type GetPacksResponseType = {
    cardPacks: PackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}
export type CreateNewPackData = {
    name: string
    deckCover?: string
    private?: boolean
}
export type CreatePacksResponseType = {
    newCardsPack: PackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}
export type RemovePackResponseType = {
    deletedCardsPack: PackType
    token: string
    tokenDeathTime: number
}
export type ChangePackNameResponseType = {
    updatedCardsPack: PackType
    token: string
    tokenDeathTime: number
}
