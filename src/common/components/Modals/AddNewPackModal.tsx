import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import React, { useState } from 'react'
import { BasicModal } from './BasicModal'

type AddNewPackType = {
    title: string
}

export const AddNewPackModal = (props: AddNewPackType) => {
    let [name, setName] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (name.trim() !== '') {
            name.trim()
            setName('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.checked ? true : false
    }
    // const addNewPack = (name: string, isPrivate: boolean) => {
    //     const newPack = {
    //         cardsPack: {
    //             name: addItem,
    //             deckCover: '',
    //             isPrivate: onChangeHandler(),
    //         },
    //     }
    // }

    return (
        <BasicModal title={props.title}>
            <h2>add new pack</h2>
            <TextField variant="standard" label="Name pack" value={name} />
            <FormGroup>
                <FormControlLabel control={<Checkbox onChange={onChangeHandler} />} label="Private pack" />
            </FormGroup>
            {/* <Button onClick={addNewPack()}>Save</Button> */}
        </BasicModal>
    )
}
