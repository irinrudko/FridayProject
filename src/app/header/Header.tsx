import React from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '../routes/Routes'
import s from './Header.module.css'

const Header = () => {
    return (
        <div className={s.headerContainer}>
            <NavLink to={routes.main} className={s.navLink}>
                Main{' '}
            </NavLink>
            <NavLink to={routes.profile} className={s.navLink}>
                Profile{' '}
            </NavLink>
            <NavLink to={routes.login} className={s.navLink}>
                Login{' '}
            </NavLink>
            <NavLink to={routes.registration} className={s.navLink}>
                Registration{' '}
            </NavLink>
            <NavLink to={routes.forgotPassword} className={s.navLink}>
                Forgot password{' '}
            </NavLink>
            <NavLink to={routes.newPassword} className={s.navLink}>
                New Password{' '}
            </NavLink>
            <NavLink to={routes.passwordRecovery} className={s.navLink}>
                Password Recovery{' '}
            </NavLink>
            <NavLink to={routes.error404} className={s.navLink}>
                404{' '}
            </NavLink>
        </div>
    )
}

export default Header
