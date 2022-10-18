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
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../app/store'
import { newPassword } from './forgotPassword-reducer'

export const NewPassword = () => {
    const dispatch = useAppDispatch()
    const [password, setPassword] = useState(false)
    const { token } = useParams<{ token: string }>()
    console.log(token)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    const handleClickShowPassword = (type: 'pass' | 'confirm') => {
        if (type === 'pass') {
            setPassword(!password)
        }
    }

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        onSubmit: (values) => {
            dispatch(newPassword({ ...values, resetPasswordToken: token }))
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
