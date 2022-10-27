import React, { useState } from 'react'
import s from './CardsList.module.scss'
import { PaginationBlock } from '../../../common/components/PaginationBlock/PaginationBlock'
import { BackPackArrow } from '../../../common/components/BackPackArrow/BackPackArrow'
import HeadBlock from './HeadBlock/HeadBlock'
import CardsSettings from './CardSettings/CardsSettings'
import { CardsTable } from './CardsTable/CardsTable'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { CardType } from '../../../api/cardsAPI'
import { PagePack } from '../PagePack/PagePack'
import { Search } from '../../../common/components/Search/Search'
import { getCardsTC } from '../cards-reducer'

export const CardsList = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector((state) => state.auth.user._id)
    const packId = useAppSelector((state) => state.table.packId)
    const cardPacks = useAppSelector((state) => state.packs.cardPacks)
    const id = useAppSelector((store) => store.table.userId)
    // @ts-ignore
    const myCardPacks = useAppSelector((state) => state.cards.cards)
    // @ts-ignore
    const packName = useAppSelector((store) => store.cards.packName)

    const searchCard = (searchValue: string) => {
        dispatch(getCardsTC({ cardQuestion: searchValue, cardsPack_id: packId }))
    }

    const deleteCard = () => {
        alert('Delete Card')
    }
    const editCard = () => {
        alert('Edit Card')
        console.log(myCardPacks)
    }

    const deletePack = () => {
        alert('Delete Pack')
    }
    const editPack = () => {
        alert('Edit Pack')
    }
    const learnPack = () => {
        alert('Learn Pack')
    }

    return (
        <div className={s.friendListContainer}>
            {/*<PagePack/>*/}
            <BackPackArrow />
            <HeadBlock
                deletePack={deletePack}
                editPack={editPack}
                learnPack={learnPack}
                cardPacks={cardPacks}
                packId={packId}
                userId={userId}
                id={id}
                packName={packName}
            />
            <div className={s.descriptionBlock}>
                <span>Search</span>
            </div>
            <Search
                searchPack={searchCard}
                searchStyle={{ display: 'flex', alignItems: 'center', width: '100%', height: '36px', marginBottom: '15px' }}
            />
            {/*<CardsSettings />*/}
            <CardsTable
                deleteCard={deleteCard}
                editCard={editCard}
                userId={userId}
                packId={packId}
                myCardPacks={myCardPacks}
                id={id}
            />
            {/*<PaginationBlock setPaginationPage={} valueFromPagination={}/>*/}
        </div>
    )
}
