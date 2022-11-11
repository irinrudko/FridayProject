import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'
import { useAppDispatch } from '../../../../../../app/store'
import { updatePackTC } from '../../../packs-reducer'

type HandlePrivatePackType = {
    id: string
    isPrivate: boolean
    packName: string
    avatar: string
}

export const HandlePrivatePack: React.FC<HandlePrivatePackType> = (props) => {
    const dispatch = useAppDispatch()

    const setIsPrivateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isPrivate = e.currentTarget.checked
        dispatch(updatePackTC(props.id, props.packName, props.avatar, isPrivate))
    }
    return (
        <>
            {props.isPrivate ? (
                <Checkbox onChange={setIsPrivateHandler} checked={props.isPrivate} />
            ) : (
                <Checkbox onChange={setIsPrivateHandler} checked={false} />
            )}
        </>
    )
}
