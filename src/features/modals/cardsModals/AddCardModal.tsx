import React from 'react'
import { FormControl, InputLabel, NativeSelect, TextField } from '@mui/material'
import { useAppDispatch } from '../../../app/store'
import { BasicModal } from '../../../common/components/Modal/BasicModal'
import { addCardTC } from '../../cards/CardsList/cards-reducer'
import UploadPhoto from './UploadPhoto/UploadPhoto'

type AddCardModalType = {
    title: string
    packId: string
    isShowing: boolean
    hide: () => void
}

export const AddCardModal = (props: AddCardModalType) => {
    const dispatch = useAppDispatch()

    const [question, setQuestion] = React.useState('')
    const [answer, setAnswer] = React.useState('')
    const [text, setText] = React.useState<boolean>(true)
    const [uploadPhoto, setUploadPhoto] = React.useState<string>('')

    const setQuestionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const setAnswerHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.currentTarget.value === 'text' ? setText(true) : setText(false)
    }

    const addNewCard = () => {
        const newCard = {
            card: {
                cardsPack_id: props.packId,
                question: question,
                answer: answer,
                questionImg: uploadPhoto,
            },
        }
        dispatch(addCardTC(newCard))
        setQuestion('')
        setAnswer('')
        setUploadPhoto('')
    }

    return (
        <BasicModal title={props.title} onSaveClick={addNewCard} isShowing={props.isShowing} hide={props.hide}>
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
