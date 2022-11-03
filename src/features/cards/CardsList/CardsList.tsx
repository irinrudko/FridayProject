import React, { useEffect } from 'react'
import s from './CardsList.module.scss'
import { BackPackArrow } from '../../../common/components/BackPackArrow/BackPackArrow'
import HeadBlock from './HeadBlock/HeadBlock'
import { CardsTable } from './CardsTable/CardsTable'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { Search } from '../../../common/components/Search/Search'
import { addCardTC, getCardsTC, removeCardTC, resetCardAC } from './cards-reducer'
import { removePackTC } from '../PackList/packs-reducer'
import { useParams } from 'react-router-dom'
import { setCardParams } from './cardParams-reducer'
import { PaginationBlock } from '../../../common/components/PaginationBlock/PaginationBlock'
import { EditPackModal } from '../../../common/components/Modals/archive/EditPackModal'

export const CardsList = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector((state) => state.auth.user._id)
    const cardPacks = useAppSelector((state) => state.packs.cardPacks)

    const myCardPacks = useAppSelector((state) => state.cards.cards)
    const packUserId = useAppSelector((state) => state.cards.packUserId)
    const cardsTotalCount = useAppSelector((state) => state.cards.cardsTotalCount)
    const packName = useAppSelector((store) => store.cards.packName)
    const { urlPackId } = useParams<string>()
    // {/*    <WithoutCards addCard={addCard} packUserId={packUserId} userId={userId} />*/}
    const cardQuestion = useAppSelector((state) => state.cardParams.cardQuestion)
    const cardAnswer = useAppSelector((state) => state.cardParams.cardAnswer)
    const sortCards = useAppSelector((state) => state.cardParams.sortCards)
    const max = useAppSelector((state) => state.cardParams.max)
    const min = useAppSelector((state) => state.cardParams.min)
    const page = useAppSelector((state) => state.cardParams.page)
    const pageCount = useAppSelector((state) => state.cardParams.pageCount)
    const cardsPack_id = useAppSelector((state) => state.cardParams.cardsPack_id)

    const [searchValue, setSearchValue] = React.useState('')

    const newCard = {
        card: {
            cardsPack_id: urlPackId!,
            question: 'ready to be changed?',
            answer: 'no, please',
            grade: 0,
            shots: 0,
            answerImg: 'url or base 64',
            questionImg: 'url or base 64',
            questionVideo: 'url or base 64',
            answerVideo: 'url or base 64',
        },
    }
    const cardParams = { cardsPack_id, cardQuestion, cardAnswer, sortCards, max, min, page, pageCount }

    useEffect(() => {
        // dispatch(getCardsTC({ cardsPack_id: urlPackId!, pageCount: 8 }))
        dispatch(getCardsTC({ ...cardParams, cardsPack_id: urlPackId! }))
        return () => {
            // dispatch(resetCardAC())
        }
    }, [cardsPack_id, cardQuestion, cardAnswer, sortCards, max, min, page, pageCount])

    const valueFromPagination = {
        totalCount: cardsTotalCount,
        pageCount: pageCount,
        pagePack: page,
    }
    const setPaginationPage = (page: number) => {
        dispatch(setCardParams({ cardsPack_id, page }))
    }
    const setPageCount = (pageCount: number) => {
        dispatch(setCardParams({ pageCount, cardsPack_id }))
    }
    const addCard = () => {
        dispatch(addCardTC(newCard, { cardsPack_id: urlPackId! }))
    }

    const searchCard = (searchValue: string) => {
        dispatch(setCardParams({ cardQuestion: searchValue, cardsPack_id: urlPackId! }))
    }

    const deleteCard = (id: string) => {
        dispatch(removeCardTC(id, { cardsPack_id: urlPackId! }))
    }
    const editCard = () => {
        alert('Edit Card')
    }

    const deletePack = (packId: string) => {
        dispatch(removePackTC(packId, { user_id: userId }))
    }
    const editPack = () => {
        alert('Edit Pack')
    }
    const learnPack = () => {
        alert('Learn Pack')
    }

    const setFilterUpdateGrade = (sortCards: string) => {
        dispatch(setCardParams({ cardsPack_id: urlPackId!, sortCards }))
    }

    return (
        <div className={s.friendListContainer}>
            <BackPackArrow />
            <HeadBlock
                deletePack={deletePack}
                editPack={editPack}
                learnPack={learnPack}
                userId={userId}
                packName={packName}
                myCardPacks={myCardPacks}
                addCard={addCard}
                packUserId={packUserId}
            />
            {/*{cardsTotalCount === 0 ? (*/}
            {/*    <WithoutCards addCard={addCard} packUserId={packUserId} userId={userId} />*/}
            {/*) : (*/}
            {/*    <>*/}
            <div className={s.descriptionBlock}>
                <span>Search</span>
            </div>
            <Search
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                searchPack={searchCard}
                searchStyle={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    height: '36px',
                    marginBottom: '25px',
                    marginTop: '9px',
                }}
            />
            <CardsTable
                deleteCard={deleteCard}
                editCard={editCard}
                userId={userId}
                myCardPacks={myCardPacks}
                setFilterUpdateGrade={setFilterUpdateGrade}
                packUserId={packUserId}
            />
            {/*</>*/}
            {/*)}*/}
            <PaginationBlock
                valueFromPagination={valueFromPagination}
                setPaginationPage={setPaginationPage}
                setPageCount={setPageCount}
            />
        </div>
    )
}
