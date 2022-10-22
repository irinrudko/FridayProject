import React from 'react'
import s from './PackList.module.scss'
import Button from '@mui/material/Button'
import { Navigate } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'
import { useAppSelector } from '../../../app/store'
import { SettingsBlock } from './SettingsBlock/SettingsBlock'
import { PackListTable } from './Table/PackListTable'

export const PackList = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={routes.login} />
    }

    return (
        <div className={s.packListContainer}>
            <div className={s.headBlock}>
                <h2 className={s.headName}>Pack list</h2>
                <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button}>
                    Add new pack
                </Button>
            </div>

            <div className={s.descriptionBlock}>
                <span>Search</span>
                <span className={s.second}>Show packs cards</span>
                <span className={s.third}>Number of cards</span>
            </div>

            <div className={s.settingsBlock}>
                <SettingsBlock />
            </div>

            <div className={s.tableBlock}>
                <PackListTable />
            </div>

            <div className={s.paginationBlock}>pagin</div>
        </div>
    )
}
