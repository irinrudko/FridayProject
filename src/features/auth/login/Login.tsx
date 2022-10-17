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
import { loginTC } from './login-reducer'
import { useAppDispatch, useAppSelector } from '../../../app/store'

//TODO: validation

const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>((state) => state.login.isLoggedIn)
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
        onSubmit: (values) => {
            dispatch(loginTC(values))
        },
    })

    if (isLoggedIn) {
        return <Navigate to={routes.profile} />
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
                                name="email"
                                margin="normal"
                                variant="standard"
                                className={authStyle.textField}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <FormControl variant="standard">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    type={password ? 'text' : 'password'}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    className={authStyle.textField}
                                    autoComplete="on"
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

export default Login
