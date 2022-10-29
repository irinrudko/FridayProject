import React, { useEffect } from 'react'
import s from './CardsList.module.scss'
import { BackPackArrow } from '../../../common/components/BackPackArrow/BackPackArrow'
import HeadBlock from './HeadBlock/HeadBlock'
import { CardsTable } from './CardsTable/CardsTable'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { Search } from '../../../common/components/Search/Search'
import { addCardTC, getCardsTC, removeCardTC } from './cards-reducer'
import { removePackTC } from '../PackList/packs-reducer'
import { useParams } from 'react-router-dom'
import { WithoutCards } from '../WithoutCards/WithoutCards'

export const CardsList = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector((state) => state.auth.user._id)
    const packId = useAppSelector((state) => state.table.packId)
    const cardPacks = useAppSelector((state) => state.packs.cardPacks)
    const myCardPacks = useAppSelector((state) => state.cards.cards)
    const packUserId = useAppSelector((state) => state.cards.packUserId)
    const cardsTotalCount = useAppSelector((state) => state.cards.cardsTotalCount)
    const packName = useAppSelector((store) => store.cards.packName)
    const { urlPackId } = useParams<string>()

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

    const addCard = () => {
        dispatch(addCardTC(newCard, { cardsPack_id: urlPackId!, pageCount: 8 }))
    }

    const searchCard = (searchValue: string) => {
        dispatch(getCardsTC({ cardQuestion: searchValue, cardsPack_id: packId }))
    }

    const deleteCard = (id: string) => {
        dispatch(removeCardTC(id, { cardsPack_id: packId, pageCount: 8 }))
    }
    const editCard = () => {
        alert('Edit Card')
    }

    const deletePack = (packId: string) => {
        dispatch(removePackTC(packId, { user_id: userId, pageCount: 8 }))
    }
    const editPack = () => {
        alert('Edit Pack')
    }
    const learnPack = () => {
        alert('Learn Pack')
    }

    const setFilterUpdateGrade = (sortCards: string) => {
        dispatch(getCardsTC({ cardsPack_id: urlPackId!, sortCards, pageCount: 8 }))
    }

    useEffect(() => {
        dispatch(getCardsTC({ cardsPack_id: urlPackId!, pageCount: 8 }))
    }, [])

    return (
        <div className={s.friendListContainer}>
            <BackPackArrow />
            <HeadBlock
                deletePack={deletePack}
                editPack={editPack}
                learnPack={learnPack}
                cardPacks={cardPacks}
                packId={packId}
                userId={userId}
                packName={packName}
                myCardPacks={myCardPacks}
                addCard={addCard}
            />
            {cardsTotalCount === 0 ? (
                <WithoutCards addCard={addCard} packUserId={packUserId} userId={userId} />
            ) : (
                <>
                    <div className={s.descriptionBlock}>
                        <span>Search</span>
                    </div>
                    <Search
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
                    />
                </>
            )}
            {/*<PaginationBlock setPaginationPage={} valueFromPagination={}/>*/}
        </div>
    )
}
