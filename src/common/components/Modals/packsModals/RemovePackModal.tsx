import React from 'react'
import s from '../BasicModal.module.scss'
import { useAppDispatch } from '../../../../app/store'
import { removePackTC } from '../../../../features/cards/PackList/packs-reducer'
import { BasicModal } from '../BasicModalWithPortal'

type RemovePackModalType = {
    title: string
    id: string
    packName: string
    isShowing: boolean
    hide: () => void
    buttonTitle?: string
}

export const RemovePackModal = (props: RemovePackModalType) => {
    //TODO:
    //add red color on Delete button (BasicModal component)
    const dispatch = useAppDispatch()

    const removePack = () => {
        dispatch(removePackTC(props.id))
    }

    return (
        <BasicModal
            title={props.title}
            onSaveClick={removePack}
            isShowing={props.isShowing}
            hide={props.hide}
            buttonTitle={'Delete'}
        >
            <div>
                Are you sure you want to delete <span className={s.bold}>{props.packName}</span>? All cards will be removed.{' '}
            </div>
        </BasicModal>
    )
}
