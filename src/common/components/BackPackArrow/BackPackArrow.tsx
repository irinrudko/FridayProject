import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './BackPackArrow.module.scss'
import { routes } from '../../../app/routes/Routes'

export const BackPackArrow = () => {
    return (
        <NavLink className={s.toPacksList} to={routes.packsList}>
            Back to Packs List
        </NavLink>
    )
}
