import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Paper } from '@mui/material'
import AvatarImage from '../../common/assets/image/avatar.jpg'
import s from './Profile.module.css'
import authStyle from '../auth/Auth.module.css'
import Button from '@mui/material/Button'
import { EditableSpan } from './EditableSpan/EditableSpan'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../app/routes/Routes'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { setProfileUserName } from './profile-reducer'

const Profile = () => {
    const dispatch = useAppDispatch()
    const name = useAppSelector((state) => state.profile.name)
    const email = useAppSelector((state) => state.profile.email)

    useEffect(() => {
        dispatch(setProfileUserName())
    }, [])
    const navigate = useNavigate()
    const redirectToLogin = () => {
        navigate(routes.login)
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <Paper className={s.paper} elevation={3}>
                    <h2 className={`${authStyle.title} ${s.title}`}>Personal Information</h2>
                    <img className={s.img} alt="my avatar" src={AvatarImage} />
                    <h4 className={s.name}>
                        <EditableSpan name={name} />
                    </h4>
                    <p className={s.email}>{email}</p>
                    <Button type={'submit'} variant={'outlined'} color={'inherit'} onClick={redirectToLogin}>
                        <span className={s.iconButton}></span> <span className={s.logoutText}>Log out</span>
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Profile
