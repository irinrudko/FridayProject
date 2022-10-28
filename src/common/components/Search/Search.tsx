import React, { ChangeEvent, useEffect } from 'react'
import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch } from '../../../app/store'
import { useDebouce } from '../../assets/Hook/useDebouce'

type SearchPropsType = {
    searchPack: (searchPack: string) => void
    searchStyle: any
}

export const Search: React.FC<SearchPropsType> = ({ searchPack, searchStyle }) => {
    const dispatch = useAppDispatch()

    const [searchValue, setSearchValue] = React.useState('')
    const debouncedValue = useDebouce<string>(searchValue, 500)
    const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchValue(e.currentTarget.value)
    }
    useEffect(() => {
        if (searchValue === '') {
            return
        }
        searchPack(searchValue)
    }, [debouncedValue])

    return (
        <Paper component="form" sx={searchStyle}>
            <IconButton type="button" sx={{ p: '10px', cursor: 'pointer' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Provide your text"
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={onChangeSearchHandler}
                value={searchValue}
            />
        </Paper>
    )
}
