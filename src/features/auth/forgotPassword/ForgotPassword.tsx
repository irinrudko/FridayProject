import React, { useState } from 'react'
import s from './ForgotPassword.module.css'
import authStyle from '../Auth.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { useAppDispatch } from '../../../app/store'
import { forgotPassword } from './forgotPassword-reducer'

export const ForgotPassword = () => {
    const dispatch = useAppDispatch()
    const [sendValue, setSendValue] = useState(false)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: (values) => {
            dispatch(forgotPassword(values))
            navigate(routes.passwordRecovery)
        },
    })

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form className={s.formContainer} onSubmit={formik.handleSubmit}>
                    <FormControl className={s.form}>
                        <FormLabel>
                            <h2 className={authStyle.title}>Forgot your password?</h2>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                name="email"
                                margin="normal"
                                variant="standard"
                                className={authStyle.textField}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <FormLabel>
                                <p className={s.textInstruction}>
                                    Enter your email address and we will send you further instructions
                                </p>
                            </FormLabel>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Send Instructions
                            </Button>
                            <p className={authStyle.text}>Did you remember your password? </p>
                            <div className={s.navlinckContainer}>
                                <NavLink to={routes.login} className={authStyle.link}>
                                    Try logging in
                                </NavLink>
                            </div>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}
