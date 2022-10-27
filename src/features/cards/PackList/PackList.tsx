import React, { useState } from 'react'
import s from './PackList.module.scss'
import Button from '@mui/material/Button'
import { Navigate } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { SettingsBlock } from './SettingsBlock/SettingsBlock'
import { PackListTable } from './Table/PackListTable'
import { PaginationBlock } from '../../../common/components/PaginationBlock/PaginationBlock'
import { addPackTC } from '../packs-reducer'

export const PackList = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const [myPack, setMyPack] = useState(false)

    const newPack = {
        cardsPack: {
            name: 'test Pack',
            deckCover: '',
            private: false,
        },
    }

    const addNewPack = () => {
        dispatch(addPackTC(newPack, { pageCount: 8 }))
    }

    if (!isLoggedIn) {
        return <Navigate to={routes.login} />
    }

    return (
        <div className={s.packListContainer}>
            <div className={s.headBlock}>
                <h2 className={s.headName}>Pack list</h2>
                <Button type={'button'} variant={'contained'} color={'primary'} className={s.button} onClick={addNewPack}>
                    Add new pack
                </Button>
            </div>
            <SettingsBlock setMyPack={(value) => setMyPack(value)} />
            <PackListTable myPack={myPack} />
            <PaginationBlock />
        </div>
    )
}
