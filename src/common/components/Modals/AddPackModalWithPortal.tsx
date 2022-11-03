import React, { useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import { useAppDispatch } from '../../../app/store'
import { addPackTC } from '../../../features/cards/PackList/packs-reducer'
import { BasicModalWithPortal } from './BasicModalWithPortal'

type AddPackModalWithPortalType = {
    title: string
    isShowing: boolean
    hide: () => void
}

export const AddPackModalWithPortal = (props: AddPackModalWithPortalType) => {
    const dispatch = useAppDispatch()

    let [name, setName] = useState('')
    let [isPrivate, setIsPrivate] = useState(false)

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
        setName('')
    }

    return (
        <BasicModalWithPortal title={props.title} onSaveClick={addNewPack} isShowing={props.isShowing} hide={props.hide}>
            <TextField variant="standard" label="Name pack" value={name} onChange={setNameHandler} />
            <FormGroup>
                <FormControlLabel control={<Checkbox onChange={setIsPrivateHandler} />} label="Private pack" />
            </FormGroup>
        </BasicModalWithPortal>
    )
}
