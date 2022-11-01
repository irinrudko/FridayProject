import React, { ChangeEvent, useEffect } from 'react'
import s from './CardSettings.module.scss'
import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { useDebouce } from '../../../../common/assets/Hook/useDebouce'
import { getCardsTC } from '../cards-reducer'

type CardsSettingsPropsType = {
    packId: string
}

const CardsSettings: React.FC<CardsSettingsPropsType> = ({ packId }) => {
    const dispatch = useAppDispatch()
    // const packId = useAppSelector((state) => state.table.packId)
    const [searchValue, setSearchValue] = React.useState('')
    const debouncedValue = useDebouce<string>(searchValue, 500)
    const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchValue(e.currentTarget.value)
    }
    useEffect(() => {
        if (searchValue === '') {
            return
        }
        dispatch(getCardsTC({ cardQuestion: searchValue, cardsPack_id: packId }))
    }, [debouncedValue])

    return (
        <div>
            <div className={s.descriptionBlock}>
                <span>Search</span>
            </div>
            <div className={s.settingsBlock}>
                <Paper component="form" sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '36px' }}>
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
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
            </div>
        </div>
    )
}

export default CardsSettings
