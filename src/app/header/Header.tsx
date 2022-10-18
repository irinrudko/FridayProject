import React from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '../routes/Routes'
import s from './Header.module.css'
import { AppRootStateType, useAppDispatch, useAppSelector } from '../store'
import { logoutTC } from '../../features/auth/login/login-reducer'

const Header = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>((store: AppRootStateType) => store.login.isLoggedIn)
    const onclickHandler = () => {
        alert('logout')
        dispatch(logoutTC())
    }

    return (
        <div className={s.headerContainer}>
            <NavLink to={routes.main} className={s.navLink}>
                Main{' '}
            </NavLink>
            <NavLink to={routes.profile} className={s.navLink}>
                Profile{' '}
            </NavLink>
            {!isLoggedIn && (
                <NavLink to={routes.login} className={s.navLink}>
                    Login{' '}
                </NavLink>
            )}
            {!isLoggedIn && (
                <NavLink to={routes.registration} className={s.navLink}>
                    Registration{' '}
                </NavLink>
            )}
            {!isLoggedIn && (
                <NavLink to={routes.forgotPassword} className={s.navLink}>
                    Forgot password{' '}
                </NavLink>
            )}
            {!isLoggedIn && (
                <NavLink to={routes.newPassword} className={s.navLink}>
                    New Password{' '}
                </NavLink>
            )}
            {!isLoggedIn && (
                <NavLink to={routes.passwordRecovery} className={s.navLink}>
                    Password Recovery{' '}
                </NavLink>
            )}
            <NavLink to={routes.error404} className={s.navLink}>
                404{' '}
            </NavLink>
            {isLoggedIn && (
                <NavLink to={routes.login} className={s.navLink} onClick={onclickHandler}>
                    Logout{' '}
                </NavLink>
            )}
        </div>
    )
}

export default Header
