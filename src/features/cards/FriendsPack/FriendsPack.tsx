import React from 'react'
import s from './FriendsPack.module.scss'
import Button from '@mui/material/Button'
import { SettingsBlock } from '../PackList/SettingsBlock/SettingsBlock'
import { PackListTable } from '../PackList/Table/PackListTable'
import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'
import { FriendsTable } from './FriendsTable/FriendsTable'

export const FriendsPack = () => {
    return (
        <div className={s.friendListContainer}>
            <NavLink className={s.toPacksList} to={routes.packsList}>
                Back to Packs List
            </NavLink>
            <div className={s.headBlock}>
                <h2 className={s.headName}>Friends pack</h2>
                <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button}>
                    Learn to pack
                </Button>
            </div>

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
                    />
                </Paper>
            </div>

            <div className={s.tableBlock}>
                <FriendsTable />
            </div>

            <div className={s.paginationBlock}>pagin</div>
        </div>
    )
}
