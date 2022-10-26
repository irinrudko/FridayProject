import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import s from './PaginationBlock.module.scss'
import { BasicSelect } from './BaseSelect/BaseSelect'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { getPacksTC } from '../../../features/cards/packs-reducer'

export const PaginationBlock = () => {
    const dispatch = useAppDispatch()

    const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount)
    const pageCount = useAppSelector((state) => state.setting.pageCount)
    const pagePack = useAppSelector((state) => state.setting.page)
    const packName = useAppSelector((state) => state.setting.packName)
    const min = useAppSelector((state) => state.setting.min)
    const max = useAppSelector((state) => state.setting.max)
    const block = useAppSelector((state) => state.setting.block)
    const user_id = useAppSelector((state) => state.setting.user_id)
    const sortPacks = useAppSelector((state) => state.setting.sortPacks)

    useEffect(() => {
        setCount(cardPacksTotalCount)
        setPage(pagePack)
        setPageCountValue(pageCount)
    }, [cardPacksTotalCount, pageCount, pagePack])
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(pagePack)
    const [pageCountValue, setPageCountValue] = useState(0)

    const settingData = {
        user_id,
        packName,
        min,
        max,
        sortPacks,
        page,
        pageCount,
        block,
    }
    useEffect(() => {
        dispatch(getPacksTC(settingData))
    }, [page])

    return (
        <div className={s.paginationBlock}>
            <Stack spacing={1}>
                <Pagination
                    shape="rounded"
                    color={'primary'}
                    count={count}
                    page={page}
                    onChange={(e, num) => {
                        setPage(num)
                    }}
                />
            </Stack>
            <div className={s.containerBaseSelect}>
                Show <BasicSelect /> Cards per Page
            </div>
        </div>
    )
}
