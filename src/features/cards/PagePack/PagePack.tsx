import React from 'react'
import s from './PagePack.module.scss'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'
import Button from '@mui/material/Button'

export const PagePack = () => {
    return (
        <div className={s.friendListContainer}>
            <NavLink className={s.toPacksList} to={routes.packsList}>
                Back to Packs List
            </NavLink>
            <div className={s.headBlock}>
                <h2 className={s.headName}>Name Pack</h2>
            </div>

            <div className={s.descriptionBlock}>
                <span className={s.text}>This pack is empty. Click add new card to fill this pack</span>
                <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button}>
                    Add new card
                </Button>
            </div>
        </div>
    )
}
