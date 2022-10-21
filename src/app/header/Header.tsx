import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '../routes/Routes'
import s from './Header.module.scss'
import { AppRootStateType, useAppDispatch, useAppSelector } from '../store'

import Button from '@mui/material/Button'
import AvatarImage from '../../common/assets/image/avatar.jpg'
import CollapsedMenu from '../../common/components/CollapsedMenu/CollapsedMenu'

const Header = () => {
    const isLoggedIn = useAppSelector<boolean>((store: AppRootStateType) => store.auth.isLoggedIn)
    const name = useAppSelector((state) => state.profile.name)
    const avatar = useAppSelector((state) => state.profile.avatar)
    const [collapsed, setCollapsed] = useState<boolean>(true)
    const inputClass = !collapsed ? s.active : s.nav

    const onClickHandler = () => {
        setCollapsed(!collapsed)
    }

    return (
        <div className={s.headerContainer}>
            <div className={s.mainBlock}>
                {!isLoggedIn && (
                    <NavLink to={routes.login} className={s.navLink}>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            className={s.button}
                            style={{ borderRadius: '30px' }}
                        >
                            Sign In
                        </Button>
                    </NavLink>
                )}
                {isLoggedIn && (
                    <div className={s.profileBlock}>
                        <div className={s.profileName} onClick={onClickHandler}>
                            {name}
                        </div>
                        <div>
                            {/*{avatar}*/}
                            <img className={s.img} alt="my avatar" src={AvatarImage} />
                        </div>
                        <div className={inputClass}>
                            <CollapsedMenu />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
