import React, { useEffect, useState } from 'react'
import s from './PackList.module.scss'
import Button from '@mui/material/Button'
import { Navigate } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { SettingsBlock } from './SettingsBlock/SettingsBlock'
import { PackListTable } from './Table/PackListTable'
import { PaginationBlock } from '../../../common/components/PaginationBlock/PaginationBlock'
import { addPackTC, getPacksTC } from '../packs-reducer'
import { InitialStateSettingType } from './SettingsBlock/setting-reducer'
import { GetPackParams } from '../../../api/packsAPI'

export const PackList = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount)
    const pageCount = useAppSelector((state) => state.setting.pageCount)
    const pagePack = useAppSelector((state) => state.setting.page)
    const packName = useAppSelector((state) => state.setting.packName)
    const min = useAppSelector((state) => state.setting.min)
    const max = useAppSelector((state) => state.setting.max)
    const block = useAppSelector((state) => state.setting.block)
    const user_id = useAppSelector((state) => state.setting.user_id)
    const sortPacks = useAppSelector((state) => state.setting.sortPacks)

    const [myPack, setMyPack] = useState(false)

    const newPack = {
        cardsPack: {
            name: 'test Pack',
            deckCover: '',
            private: false,
        },
    }
    const valueFromPagination = { totalCount: cardPacksTotalCount, pageCount, pagePack }
    const setPaginationPage = (page: number) => {
        dispatch(getPacksTC({ packName, min, max, block, user_id, sortPacks, pageCount, page }))
    }

    const filterWithSlider = (value: GetPackParams) => {
        dispatch(getPacksTC(value))
    }

    const resetPackListFilter = (data: GetPackParams) => {
        dispatch(getPacksTC({ ...data }))
    }

    const setFilterPack = (user_id: string, pageCount: number) => {
        dispatch(getPacksTC({ user_id, pageCount }))
    }

    const searchPack = (searchValue: string) => {
        dispatch(getPacksTC({ packName: searchValue, pageCount: 8 }))
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
            <SettingsBlock
                searchPack={searchPack}
                setFilterPack={setFilterPack}
                resetPackListFilter={resetPackListFilter}
                filterWithSlider={filterWithSlider}
            />
            <PackListTable myPack={myPack} />
            <PaginationBlock valueFromPagination={valueFromPagination} setPaginationPage={setPaginationPage} />
        </div>
    )
}
