import { PackType } from '../../api/api'
import { getPacksAC, PacksInitialStateType, packsReducer, removePackAC, addPackAC, changePackNameAC } from './packs-reducer'

let startState: PacksInitialStateType = {
    cardPacks: <PackType[]>[
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
            updated: null,
            more_id: '',
            __v: 0,
        },
    ],
    page: 1,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
}
beforeEach(() => {
    startState = {
        cardPacks: [
            {
                _id: '394892alsd203',
                user_id: '7y678qjqwlqw',
                user_name: '',
                private: true,
                name: 'pack1',
                path: '',
                grade: 0,
                shots: 0,
                deckCover: '',
                cardsCount: 0,
                type: '',
                rating: 0,
                created: null,
                updated: null,
                more_id: '',
                __v: 0,
            },
            {
                _id: '23394892alsd203hs',
                user_id: '1212sq1211',
                user_name: '',
                private: false,
                name: 'pack2',
                path: '',
                grade: 0,
                shots: 0,
                deckCover: '',
                cardsCount: 0,
                type: '',
                rating: 0,
                created: null,
                updated: null,
                more_id: '',
                __v: 0,
            },
        ],
        page: 2,
        pageCount: 8,
        cardPacksTotalCount: 2,
        minCardsCount: 0,
        maxCardsCount: 0,
        token: '',
        tokenDeathTime: 0,
    }
})

it('should get new card packs', () => {
    const initialState = {
        cardPacks: <PackType[]>[
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
                updated: null,
                more_id: '',
                __v: 0,
            },
        ],
        page: 1,
        pageCount: 0,
        cardPacksTotalCount: 0,
        minCardsCount: 0,
        maxCardsCount: 0,
        token: '',
        tokenDeathTime: 0,
    }

    const endState = packsReducer(
        initialState,
        getPacksAC({
            cardPacks: [
                {
                    _id: '394892alsd203hs',
                    user_id: '',
                    user_name: '',
                    private: true,
                    name: '',
                    path: '',
                    grade: 0,
                    shots: 0,
                    deckCover: '',
                    cardsCount: 0,
                    type: '',
                    rating: 0,
                    created: null,
                    updated: null,
                    more_id: '',
                    __v: 0,
                },
                {
                    _id: '23394892alsd203hs',
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
                    updated: null,
                    more_id: '',
                    __v: 0,
                },
            ],
            page: 2,
            pageCount: 8,
            cardPacksTotalCount: 2,
            minCardsCount: 0,
            maxCardsCount: 0,
            token: '',
            tokenDeathTime: 0,
        })
    )

    expect(endState.page).toBe(2)
    expect(endState.pageCount).toBe(8)
    expect(endState.cardPacks[0]._id).toBe('394892alsd203hs')
    expect(endState.cardPacks[0].private).toBeTruthy()
    expect(endState.cardPacks[1].private).toBeFalsy()
    expect(endState.cardPacksTotalCount).toBe(2)
})

it('should remove one pack from cardPacks collection', () => {
    const endState = packsReducer(startState, removePackAC('394892alsd203'))

    expect(endState.cardPacks[0]._id).toBe('23394892alsd203hs')
    expect(endState.cardPacks[0]._id).not.toBe('394892alsd203')
})
it('should add one pack to cardPacks collection', () => {
    const endState = packsReducer(
        startState,
        addPackAC({
            name: 'my second Pack',
        })
    )

    expect(endState.cardPacks[2].name).toBe('my second Pack')
})

it("should change pack's name ", () => {
    const endState = packsReducer(startState, changePackNameAC('394892alsd203', 'changed name'))

    expect(endState.cardPacks[0].name).toBe('changed name')
    expect(endState.cardPacks[1].name).toBe('pack2')
})
