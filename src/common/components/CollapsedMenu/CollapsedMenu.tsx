import React, { FC } from 'react'
import s from '../../components/CollapsedMenu/CollapsedMenu.module.scss'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'
import { useAppDispatch } from '../../../app/store'
import { logoutTC } from '../../../features/auth/auth-reducer'

type CollapsedMenuPropsType = {
    setCollapsed: () => void
}

const CollapsedMenu: FC<CollapsedMenuPropsType> = ({ setCollapsed }) => {
    const dispatch = useAppDispatch()

    const redirectToLogin = () => {
        dispatch(logoutTC())
    }

    return (
        <div className={s.mainContainer}>
            <NavLink to={routes.profile}>
                <div className={s.linkBlock} onClick={setCollapsed}>
                    <span className={s.iconProfile}></span>
                    <span className={s.text}>Profile</span>
                </div>
            </NavLink>
            <NavLink to={routes.packsList}>
                <div className={s.linkBlock} onClick={setCollapsed}>
                    <span className={s.iconPack}></span>
                    <span className={s.text}>Pack</span>
                </div>
            </NavLink>
            <NavLink to={routes.login} onClick={redirectToLogin}>
                <div className={s.linkBlock} onClick={setCollapsed}>
                    <span className={s.iconLogout}></span>
                    <span className={s.text}>Log out</span>
                </div>
            </NavLink>
        </div>
    )
}

export default CollapsedMenu
