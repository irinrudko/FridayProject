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
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { addCardTC } from '../cards-reducer'
import { PagePack } from '../PagePack/PagePack'

export const MyPackPage = () => {
    const dispatch = useAppDispatch()
    // @ts-ignore
    const cards = useAppSelector((store) => store.cards.cards)
    const [collapsed, setCollapsed] = useState<boolean>(true)

    const inputClass = !collapsed ? s.active : s.nav

    const newCard = {
        card: {
            cardsPack_id: '6356688365c36e000499fa04',
            question: 'ready to be changed?',
            answer: 'no, please',
            grade: 0,
            shots: 0,
            answerImg: 'url or base 64',
            questionImg: 'url or base 64',
            questionVideo: 'url or base 64',
            answerVideo: 'url or base 64',
        },
    }

    const addCard = () => {
        dispatch(addCardTC(newCard, { cardsPack_id: '6356688365c36e000499fa04' }))
    }

    const onClickHandler = () => {
        setCollapsed(!collapsed)
        console.log(cards)
    }

    return (
        <div className={s.friendListContainer}>
            {/*? <PagePack/>*/}
            <>
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

                    <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button} onClick={addCard}>
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
            </>
        </div>
    )
}
