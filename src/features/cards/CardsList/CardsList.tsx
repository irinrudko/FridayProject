import React from 'react'
import s from './CardsList.module.scss'
import { PaginationBlock } from '../../../common/components/PaginationBlock/PaginationBlock'
import { BackPackArrow } from '../../../common/components/BackPackArrow/BackPackArrow'
import HeadBlock from './HeadBlock/HeadBlock'
import CardsSettings from './CardSettings/CardsSettings'
import { CardsTable } from './CardsTable/CardsTable'
import { useAppSelector } from '../../../app/store'

export const CardsList = () => {
    const cardPacks = useAppSelector((store) => store.packs.cardPacks)
    const userId = useAppSelector((store) => store.auth.user._id)
    const user = cardPacks.find((pack) => pack.user_id === userId)

    const deleteCard = () => {
        alert('Delete Card')
    }
    const editCard = () => {
        alert('Edit Card')
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
            {/*? <PagePack/>*/}
            <BackPackArrow />
            <HeadBlock user={user} deletePack={deletePack} editPack={editPack} learnPack={learnPack} />
            <CardsSettings />
            <CardsTable user={user} deleteCard={deleteCard} editCard={editCard} />
            <PaginationBlock />
        </div>
    )
}
