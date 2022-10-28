import * as React from 'react'
import { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import s from './PaginationBlock.module.scss'
import { BasicSelect } from './BaseSelect/BaseSelect'

type PaginationBlockPropsType = {
    valueFromPagination: {
        totalCount: number
        pageCount: number
        pagePack: number
    }
    setPaginationPage: (page: number) => void
}
export const PaginationBlock: React.FC<PaginationBlockPropsType> = ({ valueFromPagination, setPaginationPage }) => {
    useEffect(() => {
        setCount(valueFromPagination.totalCount)
        setPage(valueFromPagination.pagePack)
        setPageCountValue(valueFromPagination.pageCount)
    }, [valueFromPagination.totalCount, valueFromPagination.pageCount, valueFromPagination.pagePack])
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(valueFromPagination.pagePack)
    const [pageCountValue, setPageCountValue] = useState(0)

    useEffect(() => {
        setPaginationPage(page)
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
