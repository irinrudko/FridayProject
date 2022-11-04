import React from 'react'
import s from '../BasicModal.module.scss'
import { useAppDispatch } from '../../../../app/store'
import { BasicModal } from '../BasicModal'
import { removeCardTC } from '../../../../features/cards/CardsList/cards-reducer'

type RemoveCardModalType = {
    title: string
    id: string
    cardName: string
    isShowing: boolean
    hide: () => void
    buttonTitle?: string
}

export const RemoveCardModal = (props: RemoveCardModalType) => {
    //TODO:
    //add red color on Delete button (BasicModal component)
    const dispatch = useAppDispatch()

    const removeCard = () => {
        dispatch(removeCardTC(props.id))
    }
    return (
        <BasicModal
            title={props.title}
            onSaveClick={removeCard}
            isShowing={props.isShowing}
            hide={props.hide}
            buttonTitle={'Delete'}
        >
            <div>
                Are you sure you want to delete <span className={s.bold}>{props.cardName}</span>? This action cannot be undone.
            </div>
        </BasicModal>
    )
}
