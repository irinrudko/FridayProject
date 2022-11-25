import React, { useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { updatePackTC } from '../../cards/PackList/packs-reducer'
import { BasicModal } from '../../../common/components/Modal/BasicModal'
import UploadPhoto from '../cardsModals/UploadPhoto/UploadPhoto'
import s from '../../../common/components/Modal/BasicModal.module.scss'

type EditPackModalType = {
    title: string
    id: string
    packName?: string
    avatar?: string
    isPrivate?: boolean
    isShowing: boolean
    hide: () => void
}

export const EditPackModal = (props: EditPackModalType) => {
    const dispatch = useAppDispatch()

    const [name, setName] = useState<string | undefined>('')
    const [isPrivate, setIsPrivate] = useState(props.isPrivate)
    const [uploadPhoto, setUploadPhoto] = useState<string>('')
    const id = useAppSelector((store) => store.auth.user._id)

    useEffect(() => {
        setName(props.packName)
    }, [props.packName, props.avatar]) //to get name from props

    const setNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const setIsPrivateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.currentTarget.checked)
        console.log(e.currentTarget.checked)
    }

    const editPack = () => {
        dispatch(updatePackTC(props.id, name!, uploadPhoto, isPrivate, { user_id: id, pageCount: 100 }))
        console.log(props.id, name!, uploadPhoto, isPrivate)
    }

    return (
        <BasicModal title={props.title} onSaveClick={editPack} isShowing={props.isShowing} hide={props.hide}>
            <TextField variant="standard" label="Name pack" value={name} onChange={setNameHandler} />
            <UploadPhoto setUploadPhoto={setUploadPhoto} uploadPhoto={uploadPhoto} />
            {props.avatar && <img src={props.avatar} className={s.image} />}
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox onChange={setIsPrivateHandler} checked={isPrivate} />}
                    label="Private pack"
                />
            </FormGroup>
        </BasicModal>
    )
}
