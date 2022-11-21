import React from 'react'
import s from './ActionsMenu.module.scss'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { NavLink, useParams } from 'react-router-dom'
import { useModal } from '../../../../common/components/Modal/useModal'
import { EditCardModal } from '../../../modals/cardsModals/EditCardModal'

type ActionMenuPropsType = {}

export const ActionsMenu: React.FC<ActionMenuPropsType> = () => {
    const { urlPackId } = useParams<string>()
    const { editCardModal, toggleEditCardModal } = useModal()

    return (
        <div>
            <div className={s.mainContainer}>
                <div className={s.linkBlock}>
                    <BorderColorIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                    <span className={s.text}>Edit</span>
                </div>
                <div className={s.linkBlock}>
                    <DeleteForeverIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                    <span className={s.text}>Delete</span>
                </div>
                <NavLink to={`/packs/learn/${urlPackId}`}>
                    <div className={s.linkBlock} onClick={toggleEditCardModal}>
                        <SchoolIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                        <span className={s.text}>Learn</span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}
