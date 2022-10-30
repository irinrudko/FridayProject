import React, { ChangeEvent, useEffect, useState } from 'react'
import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch } from '../../../app/store'
import { useDebouce } from '../../assets/Hook/useDebouce'
import ClearIcon from '@mui/icons-material/Clear'

type SearchPropsType = {
    searchPack: (searchPack: string) => void
    searchStyle: any
}

export const Search: React.FC<SearchPropsType> = ({ searchPack, searchStyle }) => {
    const dispatch = useAppDispatch()

    const [searchValue, setSearchValue] = React.useState('')
    const debouncedValue = useDebouce<string>(searchValue, 500)
    const [touch, setTouch] = useState(false)
    const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchValue(e.currentTarget.value)
        setTouch(true)
    }

    const clearInputHandler = () => {
        setSearchValue('')
    }
    // убрал, так как мне нужно отслеживать пустую строку для изменения данных в таблице
    useEffect(() => {
        if (!touch && searchValue === '') {
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
            {searchValue && <ClearIcon style={{ marginRight: '8px', cursor: 'pointer' }} onClick={clearInputHandler} />}
        </Paper>
    )
}
