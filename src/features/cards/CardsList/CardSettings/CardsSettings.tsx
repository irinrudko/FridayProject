import React from 'react'
import s from './CardSettings.module.scss'
import { IconButton, InputBase, Paper } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../../app/routes/Routes'
import SearchIcon from '@mui/icons-material/Search'

const CardsSettings = () => {
    return (
        <div>
            <div className={s.descriptionBlock}>
                <span>Search</span>
            </div>
            <div className={s.settingsBlock}>
                <Paper component="form" sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '36px' }}>
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        {/*//убрать линк*/}
                        <NavLink className={s.toPacksList} to={routes.pagePack}>
                            <SearchIcon />
                        </NavLink>
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Provide your text"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                </Paper>
            </div>
        </div>
    )
}

export default CardsSettings
