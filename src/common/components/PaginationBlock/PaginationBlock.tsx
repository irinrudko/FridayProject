import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import s from './PaginationBlock.module.scss'
import { BasicSelect } from './BaseSelect/BaseSelect'

export const PaginationBlock = () => {
    return (
        <div className={s.paginationBlock}>
            <Stack spacing={1}>
                <Pagination count={10} shape="rounded" color={'primary'} />
            </Stack>
            <div className={s.containerBaseSelect}>
                Show <BasicSelect /> Cards per Page
            </div>
        </div>
    )
}
