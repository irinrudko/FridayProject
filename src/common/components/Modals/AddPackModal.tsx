import React, { useState } from 'react'
import s from './BasicModal.module.scss'

import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import { useAppDispatch } from '../../../app/store'
import { BasicModal } from './BasicModal'
import { addPackTC } from '../../../features/cards/PackList/packs-reducer'

type AddNewPackType = {
    title: string
}

export const AddPackModal = (props: AddNewPackType) => {
    const dispatch = useAppDispatch()

    let [name, setName] = useState('')
    let [isPrivate, setIsPrivate] = useState(false)

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const setNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const setIsPrivateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.currentTarget.checked)
    }

    const addNewPack = () => {
        const newPack = {
            cardsPack: {
                name: name,
                deckCover: '',
                private: isPrivate,
            },
        }
        dispatch(addPackTC(newPack))
        handleClose()
    }

    return (
        <BasicModal title={props.title} open={open} onClose={handleClose} onOpen={handleOpen}>
            <TextField variant="standard" label="Name pack" value={name} onChange={setNameHandler} />
            <FormGroup>
                <FormControlLabel control={<Checkbox onChange={setIsPrivateHandler} />} label="Private pack" />
            </FormGroup>
            <Button onClick={addNewPack} variant={'contained'} color={'primary'} className={`${s.button} ${s.buttonPrimary}`}>
                Save
            </Button>
        </BasicModal>
    )
}
