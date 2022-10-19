import React from 'react'
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
import { FormikErrorType } from '../auth-types'

export const ForgotPassword = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const navigateToPasswordRecovery = () => {
        navigate(routes.passwordRecovery)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            return errors
        },
        onSubmit: (values) => {
            dispatch(forgotPassword(values, navigateToPasswordRecovery))
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
                            {formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}

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
