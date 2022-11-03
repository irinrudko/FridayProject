import React, { useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import { useAppDispatch } from '../../../../app/store'
import { BasicModal } from './BasicModal'
import { updatePackTC } from '../../../../features/cards/PackList/packs-reducer'

type EditPackModalType = {
    title: string
    id: string
    packName: string
}

export const EditPackModal = (props: EditPackModalType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        // dispatch(getPackTC(id))
        setName(props.packName)
    }, [props.packName])

    let [name, setName] = useState('')
    let [isPrivate, setIsPrivate] = useState(false)

    const setNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const setIsPrivateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.currentTarget.checked)
    }

    const editPack = () => {
        dispatch(updatePackTC(props.id, name, isPrivate))
        alert('edit in modal')
    }

    console.log(props.id)
    console.log(name)
    console.log(isPrivate)

    return (
        <BasicModal title={props.title} onSaveClick={editPack}>
            <TextField variant="standard" label="Name pack" value={name} onChange={setNameHandler} />
            <FormGroup>
                <FormControlLabel control={<Checkbox onChange={setIsPrivateHandler} />} label="Private pack" />
            </FormGroup>
        </BasicModal>
    )
}
