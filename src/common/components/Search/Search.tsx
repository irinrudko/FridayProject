import React, { ChangeEvent, useEffect } from 'react'
import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch } from '../../../app/store'
import { useDebouce } from '../../assets/Hook/useDebouce'

type SearchPropsType = {
    searchPack: (searchPack: string) => void
    searchStyle: any
    setSearchValue: (searchValue: string) => void
    searchValue: string
}

export const Search: React.FC<SearchPropsType> = ({ searchPack, searchStyle, setSearchValue, searchValue }) => {
    const dispatch = useAppDispatch()

    // const [searchValue, setSearchValue] = React.useState('')
    const debouncedValue = useDebouce<string>(searchValue, 500)
    const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchValue(e.currentTarget.value)
    }
    useEffect(() => {
        searchPack(searchValue)
    }, [debouncedValue])

    return (
        <Paper component="form" sx={searchStyle}>
            <IconButton type="button" sx={{ p: '10px', cursor: 'pointer' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                type={'search'}
                placeholder="Provide your text"
                onChange={onChangeSearchHandler}
                value={searchValue}
                style={{ paddingRight: '8px', cursor: 'pointer' }}
            />
        </Paper>
    )
}
