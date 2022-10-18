import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import s from './EditableSpan.module.css'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { changeUserName } from '../profile-reducer'
import { useFormik } from 'formik'

type EditableSpanPropsType = {
    name: string
}
export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    const dispatch = useAppDispatch()

    let [editMode, setEditMode] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: (values) => {
            dispatch(changeUserName(values))
            setEditMode(false)
        },
    })

    const activateEditMode = () => {
        setEditMode(true)
    }

    return editMode ? (
        <>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <TextField
                    name="name"
                    label="Nickname"
                    margin="normal"
                    variant="standard"
                    color={'info'}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    autoFocus
                    className={s.TextField}
                />
                <Button
                    type={'submit'}
                    variant={'outlined'}
                    color={'inherit'}
                    className={s.buttonSubmit}
                    style={{ borderRadius: '2px', background: '#366eff', color: 'white' }}
                >
                    save
                </Button>
            </form>
        </>
    ) : (
        <span onDoubleClick={activateEditMode}>{props.name}</span>
    )
})
