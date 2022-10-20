import React, { useState } from 'react'
import s from './ForgotPassword.module.css'
import authStyle from '../Auth.module.css'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../app/store'
import { newPassword } from './forgotPassword-reducer'
import { FormikErrorType } from '../auth-types'
import { routes } from '../../../app/routes/Routes'

export const NewPassword = () => {
    const dispatch = useAppDispatch()
    const [password, setPassword] = useState(false)
    const navigate = useNavigate()
    const { token } = useParams<{ token: string }>()

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    const handleClickShowPassword = (type: 'pass') => {
        if (type === 'pass') {
            setPassword(!password)
        }
    }
    const redirectToLogin = () => {
        navigate(routes.login)
    }
    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length < 8) {
                errors.password = 'Must be 8 characters or more'
            }

            return errors
        },
        onSubmit: (values) => {
            dispatch(newPassword({ ...values, resetPasswordToken: token }, redirectToLogin))
        },
    })

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form className={`${authStyle.form} ${s.formNewPassword}`} onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <h2 className={authStyle.title}>Create new password</h2>
                        </FormLabel>
                        <FormGroup>
                            <FormControl variant="standard" className={s.newPassword}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    type={password ? 'text' : 'password'}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    className={s.input}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleClickShowPassword('pass')}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {password ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
                            </FormControl>
                            <FormLabel>
                                <p className={s.textInstruction}>
                                    Create new password and we will send you further instructions to email
                                </p>
                            </FormLabel>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                className={`${authStyle.button} ${s.button}`}
                            >
                                Create new password
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}
