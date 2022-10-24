import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Paper } from '@mui/material'
import AvatarImage from '../../common/assets/image/avatar.jpg'
import s from './Profile.module.css'
import authStyle from '../auth/Auth.module.css'
import Button from '@mui/material/Button'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { Navigate, NavLink } from 'react-router-dom'
import { routes } from '../../app/routes/Routes'
import { useAppDispatch, useAppSelector } from '../../app/store'

import { logoutTC } from '../auth/auth-reducer'

const Profile = () => {
    const dispatch = useAppDispatch()
    const name = useAppSelector((state) => state.auth.user.name)
    const email = useAppSelector((state) => state.auth.user.email)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)



    const redirectToLogin = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={routes.login} />
    }

    return (
        <>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <div className={s.toPacksListContainer}>
                        <NavLink className={s.toPacksList} to={routes.packsList}>
                            Back to Packs List
                        </NavLink>
                    </div>
                    <Paper className={s.paper} elevation={3}>
                        <h2 className={`${authStyle.title} ${s.title}`}>Personal Information</h2>
                        <img className={s.img} alt="my avatar" src={AvatarImage} />
                        <h4 className={s.name}>
                            <EditableSpan name={name} />
                        </h4>
                        <p className={s.email}>{email}</p>
                        <Button type={'button'} variant={'outlined'} color={'inherit'} onClick={redirectToLogin}>
                            <span className={s.iconButton}></span> <span className={s.logoutText}>Log out</span>
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Profile
