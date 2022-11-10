import React, { ChangeEvent, useState } from 'react'
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import { useAppDispatch } from '../../../app/store'
import { addPackTC } from '../../cards/PackList/packs-reducer'
import { BasicModal } from '../../../common/components/Modal/BasicModal'
import { setErrAC } from '../../../app/app-reducer'

type AddPackModalType = {
    title: string
    isShowing: boolean
    hide: () => void
}

export const AddPackModal = (props: AddPackModalType) => {
    let avatar: string
    const dispatch = useAppDispatch()

    let [name, setName] = useState('')
    let [isPrivate, setIsPrivate] = useState(false)

    const setNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const setIsPrivateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.currentTarget.checked)
    }

    const uploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 1048576) {
                convertFileToBase64(file, (file64: string) => {
                    avatar = file64
                })
            } else {
                dispatch(setErrAC('Error: File size is too big. Max pic size is 1mb'))
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    const addNewPack = () => {
        const newPack = {
            cardsPack: {
                name: name,
                deckCover: avatar,
                private: isPrivate,
            },
        }
        dispatch(addPackTC(newPack))
        setName('')
    }

    return (
        <BasicModal title={props.title} onSaveClick={addNewPack} isShowing={props.isShowing} hide={props.hide}>
            <TextField variant="standard" label="Name pack" value={name} onChange={setNameHandler} />
            <label>
                <input type="file" onChange={uploadAvatar} style={{ display: 'none' }} />
                <Button variant="contained" component="span">
                    Upload pack avatar
                </Button>
            </label>
            <FormGroup>
                <FormControlLabel control={<Checkbox onChange={setIsPrivateHandler} />} label="Private pack" />
            </FormGroup>
        </BasicModal>
    )
}
