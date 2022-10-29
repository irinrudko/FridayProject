import React, { useEffect, useState } from 'react'
import s from './LearnPage.module.scss'
import Button from '@mui/material/Button'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ActionsMenu } from '../CardsList/ActionsMenu/ActionsMenu'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { ArrowBack } from '@mui/icons-material'
import { BackPackArrow } from '../../../common/components/BackPackArrow/BackPackArrow'
import { Paper, Radio, RadioGroup } from '@mui/material'
import authStyle from '../../auth/Auth.module.css'
import AvatarImage from '../../../common/assets/image/avatar.jpg'
import { EditableSpan } from '../../../common/components/EditableSpan/EditableSpan'
import { useParams } from 'react-router-dom'
import { getCardsTC } from '../CardsList/cards-reducer'
import { setIdAC } from '../PackList/table-reducer'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'

type LearnPagePropsType = {}

export const LearnPage: React.FC<LearnPagePropsType> = ({}) => {
    const dispatch = useAppDispatch()
    const packName = useAppSelector((store) => store.cards.packName)
    const myCardPacks = useAppSelector((state) => state.cards.cards)
    const userId = useAppSelector((state) => state.auth.user._id)
    const { urlPackId } = useParams<string>()

    const [showAnswer, setShowAnswer] = useState(false)

    const showAnswerHandler = () => {
        setShowAnswer(true)
    }

    const nextAnswerHandler = () => {
        setShowAnswer(false)
    }

    useEffect(() => {
        dispatch(getCardsTC({ cardsPack_id: urlPackId!, pageCount: 100 }))
    }, [])

    return (
        <div className={s.learnContainer}>
            <BackPackArrow />
            <h2 className={s.headName}>Learn "{packName}"</h2>

            {!showAnswer ? (
                <Paper className={s.paper} elevation={3}>
                    <div className={s.question}>
                        <b>Question: </b> {myCardPacks[0].question}{' '}
                    </div>
                    <div className={s.attempts}>Количество попыток ответов на вопрос: {myCardPacks[0].shots}</div>
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        className={s.button}
                        onClick={showAnswerHandler}
                    >
                        Show answer
                    </Button>
                </Paper>
            ) : (
                <Paper className={s.paper} elevation={3}>
                    <div className={s.question}>
                        <b>Question: </b> {myCardPacks[0].question}
                    </div>
                    <div className={s.attempts}>Количество попыток ответов на вопрос: {myCardPacks[0].shots}</div>
                    <div className={s.answer}>
                        <b>Answer: </b> {myCardPacks[0].answer}
                    </div>
                    <div className={s.rate}>Rate yourself:</div>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Did not know" control={<Radio />} label="Did not know" />
                            <FormControlLabel value="Forgot" control={<Radio />} label="Forgot" />
                            <FormControlLabel value="A lot of thought" control={<Radio />} label="A lot of thought" />
                            <FormControlLabel value="Confused" control={<Radio />} label="Confused" />
                            <FormControlLabel value="Knew the answer" control={<Radio />} label="Knew the answer" />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        className={s.button}
                        onClick={nextAnswerHandler}
                    >
                        Next
                    </Button>
                </Paper>
            )}
        </div>
    )
}
