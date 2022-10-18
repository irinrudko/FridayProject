import React from 'react'
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import AvatarImage from '../../common/assets/image/avatar.jpg'
import s from './Profile.module.css'
import authStyle from "../auth/Auth.module.css";
import Button from "@mui/material/Button";


const Profile = () => {

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <Paper className={s.paper} elevation={3}>
                    <h2 className={`${authStyle.title} ${s.title}`}>Personal Information</h2>
                    <img className={s.img} alt="my avatar" src={AvatarImage}/>
                    <h4 className={s.name}>Name</h4>
                    <p className={s.email}>emaillala@mail.ru</p>
                    <Button
                        type={'submit'}
                        variant={'outlined'}
                        color={'inherit'}

                    >
                        <span className={s.iconButton}></span>Log out
                    </Button>

                </Paper>
            </Grid>
        </Grid>
    )
}

export default Profile
