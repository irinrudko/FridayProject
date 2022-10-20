import React from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '../routes/Routes'
import s from './Header.module.css'
import { AppRootStateType, useAppDispatch, useAppSelector } from '../store'
import { logoutTC } from '../../features/auth/login/login-reducer'
import authStyle from '../../features/auth/Auth.module.css'
import Button from '@mui/material/Button'

const Header = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>((store: AppRootStateType) => store.login.isLoggedIn)
    const onclickHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div className={s.headerContainer}>
            <div className={s.mainBlock}>
                {/*<NavLink to={routes.main} className={s.navLink}>*/}
                {/*    Main{' '}*/}
                {/*</NavLink>*/}
                {/*<NavLink to={routes.profile} className={s.navLink}>*/}
                {/*    Profile{' '}*/}
                {/*</NavLink>*/}
                {/*{!isLoggedIn && (*/}
                {/*    <>*/}
                {/*        <NavLink to={routes.login} className={s.navLink}>*/}
                {/*            Login{' '}*/}
                {/*        </NavLink>*/}
                {/*        <NavLink to={routes.registration} className={s.navLink}>*/}
                {/*            Registration{' '}*/}
                {/*        </NavLink>*/}
                {/*        <NavLink to={routes.forgotPassword} className={s.navLink}>*/}
                {/*            Forgot password{' '}*/}
                {/*        </NavLink>*/}
                {/*        <NavLink to={routes.newPassword} className={s.navLink}>*/}
                {/*            New Password{' '}*/}
                {/*        </NavLink>*/}
                {/*        <NavLink to={routes.passwordRecovery} className={s.navLink}>*/}
                {/*            Password Recovery{' '}*/}
                {/*        </NavLink>*/}
                {/*    </>*/}
                {/*)}*/}
                {!isLoggedIn && (
                    <NavLink to={routes.login}>
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
                    <NavLink to={routes.login}>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            className={s.button}
                            style={{ borderRadius: '30px' }}
                            onClick={onclickHandler}
                        >
                            Logout
                        </Button>
                    </NavLink>
                )}
            </div>
        </div>
    )
}

export default Header
