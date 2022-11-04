import React, { useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import { useAppDispatch } from '../../../../app/store'
import { addPackTC } from '../../../../features/cards/PackList/packs-reducer'
import { BasicModal } from './BasicModal-old'

type AddNewPackType = {
    title: string
}

export const AddPackModal = (props: AddNewPackType) => {
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
        <BasicModal title={props.title} onSaveClick={addNewPack}>
            <TextField variant="standard" label="Name pack" value={name} onChange={setNameHandler} />
            <FormGroup>
                <FormControlLabel control={<Checkbox onChange={setIsPrivateHandler} />} label="Private pack" />
            </FormGroup>
        </BasicModal>
    )
}
