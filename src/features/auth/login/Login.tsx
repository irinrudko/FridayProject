import React, { useState } from 'react'
import s from './Login.module.css'
import authStyle from '../../auth/Auth.module.css'
import { Navigate, NavLink } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { FormikErrorType } from '../auth-types'
import { loginTC } from '../auth-reducer'

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const [password, setPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState(false)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleClickShowPassword = (type: 'pass' | 'confirm') => {
        if (type === 'pass') {
            setPassword(!password)
        } else {
            setConfirmPassword(!confirmPassword)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length < 8) {
                errors.password = 'Must be 8 characters or more'
            }

            return errors
        },
        onSubmit: (values) => {
            dispatch(loginTC(values))
        },
    })

    if (isLoggedIn) {
        return <Navigate to={routes.packsList} />
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl className={authStyle.form}>
                        <FormLabel>
                            <h2 className={authStyle.title}>Sign in</h2>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                variant="standard"
                                className={authStyle.textField}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{ color: 'red' }}>{formik.errors.email}</div>
                            ) : null}
                            <FormControl variant="standard">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="password"
                                    type={password ? 'text' : 'password'}
                                    className={authStyle.textField}
                                    autoComplete="on"
                                    {...formik.getFieldProps('password')}
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
                                {formik.touched.password && formik.errors.password ? (
                                    <div style={{ color: 'red' }}>{formik.errors.password}</div>
                                ) : null}
                            </FormControl>
                            <FormControlLabel
                                label={'Remember me'}
                                name="rememberMe"
                                control={<Checkbox />}
                                className={s.rememberMe}
                                onChange={formik.handleChange}
                                value={formik.values.rememberMe}
                            />
                            <p className={s.forgotPassword}>
                                <NavLink to={routes.forgotPassword}>Forgot password? </NavLink>
                            </p>

                            <Button type={'submit'} variant={'contained'} color={'primary'} className={authStyle.button}>
                                Sign In
                            </Button>
                            <p className={authStyle.text}>If you don't have an account, get registered here </p>
                            <div>
                                <NavLink to={routes.registration} className={authStyle.link}>
                                    Sign Up
                                </NavLink>
                            </div>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}
