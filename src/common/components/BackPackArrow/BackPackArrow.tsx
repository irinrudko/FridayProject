import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './BackPackArrow.module.scss'
import { routes } from '../../../app/routes/Routes'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const BackPackArrow = () => {
    return (
        <NavLink className={s.toPacksList} to={routes.packsList}>
            <KeyboardBackspaceIcon fontSize={"small"} style={{marginRight: "5px", marginLeft:"-20px"}}/>  Back to Packs List
        </NavLink>
    )
}
