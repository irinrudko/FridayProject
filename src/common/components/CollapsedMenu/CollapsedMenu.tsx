import React from 'react'
import s from '../../components/CollapsedMenu/CollapsedMenu.module.scss'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'
import { logoutTC } from '../../../features/auth/login/login-reducer'
import { useAppDispatch } from '../../../app/store'

const CollapsedMenu = () => {
    const dispatch = useAppDispatch()
    const redirectToLogin = () => {
        dispatch(logoutTC())
    }
    return (
        <div className={s.mainContainer}>
            <NavLink to={routes.login}>
                <div className={s.text}>Profile</div>
            </NavLink>
            <NavLink to={routes.login} onClick={redirectToLogin}>
                <div className={s.text}>Log out</div>
            </NavLink>
        </div>
    )
}

export default CollapsedMenu
