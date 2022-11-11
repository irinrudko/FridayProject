import React, { useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import { useAppDispatch } from '../../../app/store'
import { updatePackTC } from '../../cards/PackList/packs-reducer'
import { BasicModal } from '../../../common/components/Modal/BasicModal'
import UploadPhoto from '../cardsModals/UploadPhoto/UploadPhoto'

type EditPackModalType = {
    title: string
    id: string
    packName: string
    isShowing: boolean
    hide: () => void
}

export const EditPackModal = (props: EditPackModalType) => {
    const dispatch = useAppDispatch()
    // const packs = useAppSelector((state) => state.packs.cardPacks)
    // const pack = packs.filter((pack) => (pack._id === props.id ? pack : null))

    // const oldAvatar = pack.
    // const oldAvatar: string = packs.filter((pack) => (pack._id === props.id ? pack.deckCover : ''))

    // const avatar = pack.
    useEffect(() => {
        setName(props.packName)
    }, [props.packName]) //to get name from props

    let [name, setName] = useState('')
    let [isPrivate, setIsPrivate] = useState(false)
    const [uploadPhoto, setUploadPhoto] = React.useState<string>('')

    const setNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const setIsPrivateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.currentTarget.checked)
    }

    const editPack = () => {
        dispatch(updatePackTC(props.id, name, uploadPhoto, isPrivate))
    }

    return (
        <BasicModal title={props.title} onSaveClick={editPack} isShowing={props.isShowing} hide={props.hide}>
            <TextField variant="standard" label="Name pack" value={name} onChange={setNameHandler} />
            <UploadPhoto setUploadPhoto={setUploadPhoto} uploadPhoto={uploadPhoto} />
            <FormGroup>
                <FormControlLabel control={<Checkbox onChange={setIsPrivateHandler} />} label="Private pack" />
            </FormGroup>
        </BasicModal>
    )
}
