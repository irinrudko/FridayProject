import React, { useState } from 'react'
import s from './HeadBlock.module.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ActionsMenu } from '../ActionsMenu/ActionsMenu'
import Button from '@mui/material/Button'
import { addCardTC } from '../../cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../../app/store'

type HeadBlockPropsType = {
    user: any
    deletePack: () => void
    editPack: () => void
    learnPack: () => void
}

const HeadBlock: React.FC<HeadBlockPropsType> = ({ user, deletePack, editPack, learnPack }) => {
    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector((store) => store.packs.cardPacks)
    const packId = useAppSelector((store) => store.table.packId)

    const [collapsed, setCollapsed] = useState<boolean>(true)
    const namePack = cardPacks.map((pack) => (pack._id === packId ? pack.name : ''))

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
    }

    const inputClass = !collapsed ? s.active : s.nav

    return (
        <div className={s.headBlock}>
            <h2 className={s.headName}>
                {namePack}
                {user && (
                    <div className={s.menuIcon}>
                        <MoreVertIcon fontSize={'small'} style={{ paddingBottom: '2px' }} onClick={onClickHandler} />
                        <div className={inputClass}>
                            <ActionsMenu deletePack={deletePack} editPack={editPack} learnPack={learnPack} />
                        </div>
                    </div>
                )}
            </h2>
            {user ? (
                <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button} onClick={addCard}>
                    Add new card
                </Button>
            ) : (
                <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button} onClick={addCard}>
                    Learn to pack
                </Button>
            )}
        </div>
    )
}

export default HeadBlock
