import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useAppSelector } from '../../../../app/store'

type BasicSelectPropsType = {
    setPageCount: (pageCount: number) => void
}
export const BasicSelect: React.FC<BasicSelectPropsType> = ({ setPageCount }) => {
    const pageCount = useAppSelector((state) => state.setting.pageCount)

    const [cardsPerPage, setCardsPerPage] = React.useState(pageCount.toString())

    const handleChange = (event: SelectChangeEvent) => {
        setCardsPerPage(event.target.value as string)
        setPageCount(+event.target.value)
    }

    return (
        <FormControl sx={{ paddingLeft: 1, paddingRight: 1 }} size="small">
            <Select autoWidth labelId="demo-select-small" id="demo-select-small" value={cardsPerPage} onChange={handleChange}>
                <MenuItem value={pageCount}>{pageCount}</MenuItem>
                <MenuItem value={pageCount * 2}>{pageCount * 2}</MenuItem>
                <MenuItem value={pageCount * 3}>{pageCount * 3}</MenuItem>
                <MenuItem value={pageCount * 4}>{pageCount * 4}</MenuItem>
            </Select>
        </FormControl>
    )
}
