import React, { useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import { useAppDispatch } from '../../../app/store'
import { addPackTC } from '../../cards/PackList/packs-reducer'
import { BasicModal } from '../../../common/components/Modal/BasicModal'
import UploadPhoto from '../cardsModals/UploadPhoto/UploadPhoto'

type AddPackModalType = {
    title: string
    isShowing: boolean
    hide: () => void
}

export const AddPackModal = (props: AddPackModalType) => {
    const dispatch = useAppDispatch()

    let [name, setName] = useState('')
    let [isPrivate, setIsPrivate] = useState(false)
    const [uploadPhoto, setUploadPhoto] = React.useState<string>('')

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
                deckCover: uploadPhoto,
                private: isPrivate,
            },
        }
        dispatch(addPackTC(newPack))
        setName('')
    }

    return (
        <BasicModal title={props.title} onSaveClick={addNewPack} isShowing={props.isShowing} hide={props.hide}>
            <TextField variant="standard" label="Name pack" value={name} onChange={setNameHandler} />
            <UploadPhoto setUploadPhoto={setUploadPhoto} uploadPhoto={uploadPhoto} />
            <FormGroup>
                <FormControlLabel control={<Checkbox onChange={setIsPrivateHandler} />} label="Private pack" />
            </FormGroup>
        </BasicModal>
    )
}
