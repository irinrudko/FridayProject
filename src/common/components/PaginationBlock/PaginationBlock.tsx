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
    setPageCount: (pageCount: number) => void
}
export const PaginationBlock: React.FC<PaginationBlockPropsType> = ({ valueFromPagination, setPaginationPage, setPageCount }) => {
    useEffect(() => {
        setCount(valueFromPagination.totalCount)
        setPage(valueFromPagination.pagePack)
    }, [valueFromPagination.totalCount, valueFromPagination.pageCount, valueFromPagination.pagePack])
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(valueFromPagination.pagePack)

    const pageCountValue = Math.ceil(valueFromPagination.totalCount / valueFromPagination.pageCount)
    useEffect(() => {
        if (valueFromPagination.totalCount / valueFromPagination.pageCount < page) {
            setPaginationPage(1)
        }
        setPaginationPage(page)
    }, [page])

    if (valueFromPagination.totalCount < valueFromPagination.pageCount) {
        return <></>
    }

    return (
        <div className={s.paginationBlock}>
            <Stack spacing={1}>
                <Pagination
                    shape="rounded"
                    color={'primary'}
                    count={pageCountValue}
                    page={page}
                    onChange={(e, num) => {
                        setPage(num)
                    }}
                />
            </Stack>
            <div className={s.containerBaseSelect}>
                Show <BasicSelect setPageCount={setPageCount} /> Cards per Page
            </div>
        </div>
    )
}
