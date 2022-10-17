import React from 'react'
import s from './ForgotPassword.module.css'
import authStyle from '../Auth.module.css'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import {useFormik} from 'formik'
import ImageLetter from '../../../common/assets/image/iconSendForgotPassword.svg'


export const PasswordRecovery = () => {

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        onSubmit: (values) => {
            // alert(JSON.stringify(values))
        },
    })

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form className={s.formContainer} onSubmit={formik.handleSubmit}>
                    <FormControl className={s.form}>
                        <FormLabel>
                            <h2 className={authStyle.title}>Check Email</h2>
                        </FormLabel>
                        <FormGroup>
                            <img src={ImageLetter} alt="image letter"/>
                            <FormLabel>
                                <p className={`${s.textInstruction} ${s.textPassRecovery}`}>
                                    We’ve sent an Email with instructions to example@mail.com
                                </p>
                            </FormLabel>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
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


