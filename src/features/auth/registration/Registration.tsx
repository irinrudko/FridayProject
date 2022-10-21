import React, { useState } from 'react'
import s from './Registration.module.css'
import authStyle from '../../auth/Auth.module.css'
import { Navigate, NavLink } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { AppRootStateType, useAppDispatch, useAppSelector } from '../../../app/store'
import { FormikErrorType } from '../auth-types'
import { registrationTC } from '../auth-reducer'

const Registration = () => {
    const dispatch = useAppDispatch()
    const registered = useAppSelector<boolean>((state: AppRootStateType) => state.auth.registered)
    const isLoggedIn = useAppSelector<boolean>((state: AppRootStateType) => state.auth.isLoggedIn)
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
            confirmPassword: '',
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

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Password is required'
            } else if (values.confirmPassword.length < 8) {
                errors.confirmPassword = 'Must be 8 characters or more'
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match'
            }

            return errors
        },
        onSubmit: (values) => {
            if (formik.values.password === formik.values.confirmPassword) {
                // alert(JSON.stringify(values))
                dispatch(registrationTC(values))
                formik.resetForm()
            }
        },
    })

    if (registered) {
        return <Navigate to={routes.login} />
    }

    if (isLoggedIn) {
        return <Navigate to={routes.profile} />
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl className={authStyle.form}>
                        <FormLabel>
                            <h2 className={authStyle.title}>Sign up</h2>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                variant="standard"
                                className={authStyle.textField}
                                // onChange={formik.handleChange}
                                // value={formik.values.email}
                                // name="email"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{ color: 'red' }}>{formik.errors.email}</div>
                            ) : null}

                            <FormControl variant="standard">
                                <InputLabel htmlFor="password" variant="standard">
                                    Password
                                </InputLabel>
                                <Input
                                    id="password"
                                    type={password ? 'text' : 'password'}
                                    // onChange={formik.handleChange}
                                    // value={formik.values.password}
                                    // name="password"
                                    className={s.input}
                                    autoComplete={'on'}
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
                            <FormControl variant="standard">
                                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                <Input
                                    id="confirmPassword"
                                    type={confirmPassword ? 'text' : 'password'}
                                    // onChange={formik.handleChange}
                                    // value={formik.values.confirmPassword}
                                    // name="confirmPassword"
                                    className={s.lastInput}
                                    autoComplete={'on'}
                                    {...formik.getFieldProps('confirmPassword')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleClickShowPassword('confirm')}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {confirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div style={{ color: 'red', marginBottom: '30px' }}>{formik.errors.confirmPassword}</div>
                                ) : null}
                            </FormControl>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                // disabled={!!formik.errors.email || !!formik.errors.password || !!formik.errors.confirmPassword}
                                // disabled={!formik.errors}
                                className={`${authStyle.button} ${s.button}`}
                            >
                                Sign Up
                            </Button>
                            <div className={authStyle.text}>Already have an account?</div>
                            <div>
                                <NavLink to={routes.login} className={authStyle.link}>
                                    Sign In
                                </NavLink>
                            </div>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}

export default Registration
