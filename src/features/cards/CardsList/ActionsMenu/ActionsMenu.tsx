import React, { useEffect, useState } from 'react'
import s from './ActionsMenu.module.scss'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useModal } from '../../../../common/components/Modal/useModal'
import { EditCardModal } from '../../../modals/cardsModals/EditCardModal'
import { RemovePackModal } from '../../../modals/packsModals/RemovePackModal'
import { routes } from '../../../../app/routes/Routes'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { EditPackModal } from '../../../modals/packsModals/EditPackModal'
import { getPacksTC, resetPackAC } from '../../PackList/packs-reducer'

type ActionMenuPropsType = {}

export const ActionsMenu: React.FC<ActionMenuPropsType> = () => {
    const dispatch = useAppDispatch()
    const { urlPackId } = useParams<string>()
    const { editPackModal, toggleEditPackModal } = useModal()
    const { removePackModal, toggleRemovePackModal } = useModal()

    const [isPrivate, setIsPrivate] = useState<boolean>()
    const [packName, setPackName] = useState<string>()
    const [deckCover, setDeckCover] = useState<string>('')

    const userId = useAppSelector((store) => store.auth.user._id)
    const pack = useAppSelector((store) => store.packs.cardPacks.find((p) => p._id === urlPackId))

    useEffect(() => {
        dispatch(getPacksTC({ user_id: userId }))
        return () => {
            dispatch(resetPackAC())
        }
    }, [])

    useEffect(() => {
        if (pack?.private) {
            setIsPrivate(pack!.private)
            setPackName(pack!.name)
            setDeckCover(pack!.deckCover)
        }
    }, [pack])

    return (
        <div>
            <div className={s.mainContainer}>
                <div className={s.linkBlock} onClick={toggleEditPackModal}>
                    <BorderColorIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                    <span className={s.text}>Edit</span>
                </div>
                <div className={s.linkBlock} onClick={toggleRemovePackModal}>
                    <DeleteForeverIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                    <span className={s.text}>Delete</span>
                </div>
                <NavLink to={`/packs/learn/${urlPackId}`}>
                    <div className={s.linkBlock}>
                        <SchoolIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                        <span className={s.text}>Learn</span>
                    </div>
                </NavLink>
            </div>
            <RemovePackModal
                title="Delete pack"
                id={urlPackId!}
                packName={packName}
                isShowing={removePackModal}
                hide={toggleRemovePackModal}
            />
            <EditPackModal
                title="Edit pack"
                isShowing={editPackModal}
                hide={toggleEditPackModal}
                id={urlPackId!}
                packName={packName}
                avatar={deckCover}
                isPrivate={isPrivate}
            />
        </div>
    )
}
