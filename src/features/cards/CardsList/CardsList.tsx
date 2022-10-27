import React, { useState } from 'react'
import s from './CardsList.module.scss'
import { PaginationBlock } from '../../../common/components/PaginationBlock/PaginationBlock'
import { BackPackArrow } from '../../../common/components/BackPackArrow/BackPackArrow'
import HeadBlock from './HeadBlock/HeadBlock'
import CardsSettings from './CardSettings/CardsSettings'
import { CardsTable } from './CardsTable/CardsTable'
import { useAppSelector } from '../../../app/store'
import { CardType } from '../../../api/cardsAPI'
import { PagePack } from '../PagePack/PagePack'

export const CardsList = () => {
    const userId = useAppSelector((store) => store.auth.user._id)
    const packId = useAppSelector((store) => store.table.packId)
    const cardPacks = useAppSelector((store) => store.packs.cardPacks)
    // @ts-ignore
    const myCardPacks = useAppSelector((store) => store.cards.cards)

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
            <HeadBlock deletePack={deletePack} editPack={editPack} learnPack={learnPack} />
            <CardsSettings />
            <CardsTable deleteCard={deleteCard} editCard={editCard} userId={userId} packId={packId} myCardPacks={myCardPacks} />
            {/*<PaginationBlock />*/}
        </div>
    )
}
