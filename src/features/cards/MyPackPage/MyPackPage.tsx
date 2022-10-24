import React, { useState } from 'react'
import s from '../FriendsPack/FriendsPack.module.scss'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'
import Button from '@mui/material/Button'
import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { MyPackTable } from './MyPackTable/MyPackTable'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ActionsMenu } from './ActionsMenu/ActionsMenu'
import { PaginationBlock } from '../../../common/components/PaginationBlock/PaginationBlock'

export const MyPackPage = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true)
    const inputClass = !collapsed ? s.active : s.nav

    const onClickHandler = () => {
        setCollapsed(!collapsed)
    }

    return (
        <div className={s.friendListContainer}>
            <NavLink className={s.toPacksList} to={routes.packsList}>
                Back to Packs List
            </NavLink>
            <div className={s.headBlock}>
                <h2 className={s.headName}>
                    My pack
                    <div className={s.menuIcon}>
                        <MoreVertIcon fontSize={'small'} style={{ paddingBottom: '2px' }} onClick={onClickHandler} />
                        <div className={inputClass}>
                            <ActionsMenu />
                        </div>
                    </div>
                </h2>

                <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button}>
                    Add new card
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
                <MyPackTable />
            </div>

            <PaginationBlock />
        </div>
    )
}
