import React from 'react'
import s from './Login.module.css'
import authStyle from '../../auth/Auth.module.css'
import { NavLink } from 'react-router-dom'
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

//TODO: validation

const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: (values) => {
            // alert(JSON.stringify(values))
        },
    })

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
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                margin="normal"
                                variant="standard"
                                className={authStyle.textField}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
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

                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                className={authStyle.button}
                            >
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
