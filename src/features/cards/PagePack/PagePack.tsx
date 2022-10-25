import React from 'react'
import s from './PagePack.module.scss'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'
import Button from '@mui/material/Button'
import { addCardTC } from '../cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { BackPackArrow } from '../../../common/components/BackPackArrow/BackPackArrow'

export const PagePack = () => {
    const packName = useAppSelector((store) => store.packs.cardPacks)
    const packId = useAppSelector((store) => store.table.packId)
    const dispatch = useAppDispatch()
    const newCard = {
        card: {
            cardsPack_id: '6356688365c36e000499fa04',
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
    const namePack = packName.map((n) => (n._id === packId ? n.name : ''))

    const addCard = () => {
        dispatch(addCardTC(newCard, { cardsPack_id: '6356688365c36e000499fa04' }))
    }

    return (
        <div className={s.friendListContainer}>
            {/*<NavLink className={s.toPacksList} to={routes.packsList}>*/}
            {/*    Back to Packs List*/}
            {/*</NavLink>*/}
            <BackPackArrow />
            <div className={s.headBlock}>
                <h3 className={s.headName}> {namePack} </h3>
            </div>

            <div className={s.descriptionBlock}>
                <span className={s.text}>This pack is empty. Click add new card to fill this pack</span>
                <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button} onClick={addCard}>
                    Add new card
                </Button>
            </div>
        </div>
    )
}
