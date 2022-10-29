import React from 'react'
import s from './WithoutCards.module.scss'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'

type WithoutCards = {
    addCard?: () => void
    packUserId: string
    userId: string
}

export const WithoutCards: React.FC<WithoutCards> = ({ addCard, packUserId, userId }) => {
    return (
        <div className={s.friendListContainer}>
            <div className={s.descriptionBlock}>
                {packUserId === userId ? (
                    <>
                        <span className={s.text}>This pack is empty. Click add new card to fill this pack</span>
                        <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button} onClick={addCard}>
                            Add new card
                        </Button>
                    </>
                ) : (
                    <>
                        <span className={s.text}>This pack is empty.</span>
                        <NavLink to={routes.packsList}>
                            <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button}>
                                {' '}
                                Back to pack list
                            </Button>
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    )
}
