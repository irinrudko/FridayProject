import React, { useEffect } from 'react'
import { FormControl, InputLabel, NativeSelect, TextField } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useAppDispatch } from '../../../app/store'
import { BasicModal } from '../../../common/components/Modal/BasicModal'
import { updateCardTC } from '../../cards/CardsList/cards-reducer'
import UploadPhoto from './UploadPhoto/UploadPhoto'

type EditCardModalType = {
    title: string
    packId: string
    id: string
    question: string
    answer: string
    isShowing: boolean
    hide: () => void
}

export const EditCardModal = (props: EditCardModalType) => {
    const dispatch = useAppDispatch()

    const [question, setQuestion] = React.useState('')
    const [answer, setAnswer] = React.useState('')
    const [text, setText] = React.useState<boolean>(true)
    const [uploadPhoto, setUploadPhoto] = React.useState<string>('')

    useEffect(() => {
        setQuestion(props.question)
        setAnswer(props.answer)
    }, [props.question, props.answer]) //to get data from props

    const setQuestionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const setAnswerHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.currentTarget.value === 'text' ? setText(true) : setText(false)
    }

    const editCard = () => {
        const newCard = {
            card: {
                _id: props.id,
                question: question,
                answer: answer,
                comments: '',
                questionImg: uploadPhoto,
            },
        }
        dispatch(updateCardTC(newCard, { cardsPack_id: props.packId }))
        setQuestion('')
        setAnswer('')
        setUploadPhoto('')
    }

    return (
        <BasicModal title={props.title} onSaveClick={editCard} isShowing={props.isShowing} hide={props.hide}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Choose a question format
                </InputLabel>
                <NativeSelect
                    defaultValue="text"
                    onChange={handleChange}
                    inputProps={{
                        name: 'text',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={'text'}>Text</option>
                    <option value={'picture'}>Picture</option>
                </NativeSelect>
            </FormControl>
            {text ? (
                <TextField variant="standard" label="Question" value={question} onChange={setQuestionHandler} />
            ) : (
                <UploadPhoto setUploadPhoto={setUploadPhoto} uploadPhoto={uploadPhoto} />
            )}
            <TextField variant="standard" label="Answer" value={answer} onChange={setAnswerHandler} />
        </BasicModal>
    )
}
