import React from 'react'
import s from '../../../common/components/Modal/BasicModal.module.scss'
import { useAppDispatch } from '../../../app/store'
import { removePackTC } from '../../cards/PackList/packs-reducer'
import { BasicModal } from '../../../common/components/Modal/BasicModal'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'

type RemovePackModalType = {
    title: string
    id: string
    packName?: string
    isShowing: boolean
    hide: () => void
    buttonTitle?: string
}

export const RemovePackModal = (props: RemovePackModalType) => {
    //TODO:
    //add red color on Delete button (BasicModal component)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const removePack = async () => {
        await dispatch(removePackTC(props.id))
        await navigate(routes.packsList)
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
