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

    const totalCount = useAppSelector((state) => state.packs.cardPacksTotalCount)
    const pageCount = useAppSelector((state) => state.packs.pageCount)
    const pagePack = useAppSelector((state) => state.packs.page)
    useEffect(() => {
        setCount(totalCount)
        setPage(pagePack)
        setPageCountValue(pageCount)
    }, [totalCount, pageCount, pagePack])
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(0)
    const [pageCountValue, setPageCountValue] = useState(0)

    // useEffect(()=>{
    // dispatch(getPacksTC({pageCount:6}))
    // },[page,pageCountValue])

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
