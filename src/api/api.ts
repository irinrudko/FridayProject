import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    registration(email: string, password: string) {
        return instance.post<RegistrationPayloadType, AxiosResponse<any>>(`auth/register`, { email, password })
    },
    me() {
        return instance.post<UserData>(`auth/me`)
    },
    changeNameOrImg(data: ChangeNameOrImgType) {
        return instance.put<UserData>('auth/me', data)
    },
    login(data: LoginParamsData) {
        return instance.post<LoginParamsData, AxiosResponse<UserData>>('auth/login', data).then((response) => response.data)
    },
    logout() {
        return instance.delete<AxiosResponse<LogoutResponseType>>(`auth/me`)
    },
}

export const forgotPasswordAPI = {
    forgotPassword(dataForgotPassword: ForgotPasswordDataType) {
        return instance.post<ResponseForgotPasswordAPIType>('auth/forgot', dataForgotPassword)
    },
    sendNewPassword(dataNewPassword: DataNewPasswordType) {
        return instance.post<ResponseForgotPasswordAPIType>('auth/set-new-password', dataNewPassword)
    },
}

export const packsAPI = {
    getPacks(params: GetPackParams) {
        return instance.get<AxiosResponse<GetPacksResponseType>>('cards/pack', { params })
    },
    createPack(newPack: CreateNewPackData) {
        return instance.post<AxiosResponse<GetPacksResponseType>>('cards/pack', newPack)
    },
    removePack(id: string) {
        return instance.delete<AxiosResponse<RemovePackResponseType>>(`cards/pack?id=${id}`)
    },
    changePackName(id: string, name: string) {
        return instance.put<AxiosResponse<ChangePackNameResponseType>>('cards/pack', { id, name })
    },
}

export const cardsAPI = {
    getCards(params: GetCardParams) {
        return instance.get<AxiosResponse<GetCardsResponseType>>('cards/card', { params })
    },
    createCard(cardData: CreateCardDataType) {
        return instance.post<AxiosResponse<CreateCardResponseType>>('cards/card', cardData)
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
    created: Date
    updated: Date
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
    packCreated: Date
    packUpdated: Date
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}
export type CreateCardDataType = {
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
    created: Date
    updated: Date
    more_id: string
    __v: number
}
export type GetPackParams = {
    user_id: string
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
// authAPI types
export type ChangeNameOrImgType = {
    name?: string
    avatar?: string
}
export type ResponseForgotPasswordAPIType = {
    info: string
    error: string
}
export type DataNewPasswordType = {
    password: string
    resetPasswordToken: string | undefined
}
export type ForgotPasswordDataType = {
    email: string
    from: string
    message: string
}
export type RegistrationPayloadType = {
    email: string
    password: string
}
export type LoginParamsData = {
    email: string
    password: string
    rememberMe: boolean
}
export type UserData = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date | null
    updated: Date | null
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}
export type LogoutResponseType = {
    info: string
    error: string
}
// export type ErrorResponse = {
//     code: string,
//     config:{},
//     message: string,
// }
