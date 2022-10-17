import React, {useState} from 'react'
import s from './Registration.module.css'
import authStyle from '../../auth/Auth.module.css'
import {Navigate, NavLink} from 'react-router-dom'
import {routes} from '../../../app/routes/Routes'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useFormik} from 'formik'
import {IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {regTC} from "./registration-reducer";
import {useAppDispatch, useAppSelector} from "../../../app/store";


const Registration = () => {
    const dispatch = useAppDispatch();
    const registered = useAppSelector<boolean>(state => state.registration.registered)
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickShowPassword = (type: "pass" | "confirm") => {
        if (type === "pass") {
            setPassword(!password)
        } else {
            setConfirmPassword(!confirmPassword)
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: (values) => {
            if(formik.values.password === formik.values.confirmPassword) {
                alert(JSON.stringify(values))
                dispatch(regTC(values))
                formik.resetForm()
            }
        },
    })

    if(registered) {
        return <Navigate to={routes.login}/>
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
                                name="email"
                                margin="normal"
                                variant="standard"
                                className={authStyle.textField}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <FormControl variant="standard">
                                <InputLabel htmlFor="password" >Password</InputLabel>
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
                                                onClick={()=>handleClickShowPassword("pass")}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {password ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={confirmPassword? 'text' : 'password'}
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                    className={s.lastInput}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={()=>handleClickShowPassword("confirm")}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {confirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                className={`${authStyle.button} ${s.button}`}
                            >
                                Sign Up
                            </Button>
                            <p className={authStyle.text}>Already have an account? </p>
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
