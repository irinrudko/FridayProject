import React from 'react'
import s from './ActionsMenu.module.scss'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { NavLink, useParams } from 'react-router-dom'

type ActionMenuPropsType = {
    deletePack: (packId: string) => void
    editPack: () => void
    learnPack: () => void
    packId: string
}

export const ActionsMenu: React.FC<ActionMenuPropsType> = ({ deletePack, editPack, learnPack, packId }) => {
    const { urlPackId } = useParams<string>()

    return (
        <div>
            <div className={s.mainContainer}>
                <div className={s.linkBlock} onClick={editPack}>
                    <BorderColorIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                    <span className={s.text}>Edit</span>
                </div>
                {/*<NavLink to={routes.packsList}>*/}
                <div className={s.linkBlock} onClick={() => deletePack(packId)}>
                    <DeleteForeverIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                    <span className={s.text}>Delete</span>
                </div>
                {/*</NavLink>*/}
                <NavLink to={`/packs/learn/${urlPackId}`}>
                    <div className={s.linkBlock}>
                        <SchoolIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                        <span className={s.text}>Learn</span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}
