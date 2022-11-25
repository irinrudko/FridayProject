import React from 'react'
import s from './ForgotPassword.module.css'
import authStyle from '../Auth.module.css'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import ImageLetter from '../../../common/assets/image/iconSendForgotPassword.svg'
import { routes } from '../../../app/routes/Routes'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../app/store'

export const PasswordRecovery = () => {
    const email = useAppSelector((state) => state.auth.email)
    const navigate = useNavigate()
    const navigateToLogin = () => {
        navigate(routes.login)
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form className={s.formContainer}>
                    <FormControl className={s.form}>
                        <FormLabel>
                            <h2 className={authStyle.title}>Check Email</h2>
                        </FormLabel>
                        <FormGroup>
                            <img src={ImageLetter} alt="letter" />
                            <FormLabel>
                                <p className={`${s.textInstruction} ${s.textPassRecovery}`}>
                                    We’ve sent an Email with instructions to {email}
                                </p>
                            </FormLabel>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                onClick={navigateToLogin}
                                className={`${authStyle.button} ${s.button}`}
                            >
                                Back to login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}
