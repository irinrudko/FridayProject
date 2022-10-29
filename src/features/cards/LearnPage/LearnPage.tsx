import React, { useEffect } from 'react'
import s from './LearnPage.module.scss'
import Button from '@mui/material/Button'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ActionsMenu } from '../CardsList/ActionsMenu/ActionsMenu'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { ArrowBack } from '@mui/icons-material'
import { BackPackArrow } from '../../../common/components/BackPackArrow/BackPackArrow'
import { Paper } from '@mui/material'
import authStyle from '../../auth/Auth.module.css'
import AvatarImage from '../../../common/assets/image/avatar.jpg'
import { EditableSpan } from '../../../common/components/EditableSpan/EditableSpan'
import { useParams } from 'react-router-dom'
import { getCardsTC } from '../CardsList/cards-reducer'
import { setIdAC } from '../PackList/table-reducer'

type LearnPagePropsType = {}

export const LearnPage: React.FC<LearnPagePropsType> = ({}) => {
    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector((state) => state.packs.cardPacks)
    const packId = useAppSelector((state) => state.table.packId)
    const packName = useAppSelector((store) => store.cards.packName)
    const myCardPacks = useAppSelector((state) => state.cards.cards)
    const userId = useAppSelector((state) => state.auth.user._id)
    const namePack = cardPacks.map((pack) => (pack._id === packId ? packName : ''))
    const { urlPackId } = useParams<string>()

    const onClickHandler = () => {
        console.log(myCardPacks)
        console.log(userId)
    }

    useEffect(() => {
        dispatch(getCardsTC({ cardsPack_id: urlPackId!, pageCount: 100 }))
    }, [])

    return (
        <div className={s.learnContainer}>
            <BackPackArrow />
            <h2 className={s.headName}>Learn "{namePack}"</h2>

            <Paper className={s.paper} elevation={3}>
                <div className={s.text}>
                    <b>Question: </b> {myCardPacks[0].question}{' '}
                </div>
                <div className={s.attempts}>Количество попыток ответов на вопрос: {myCardPacks[0].shots}</div>
                <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button} onClick={onClickHandler}>
                    Show answer
                </Button>
            </Paper>
        </div>
    )
}
