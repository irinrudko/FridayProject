import React from 'react'
import s from './ActionsMenu.module.scss'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { routes } from '../../../../app/routes/Routes'
import { NavLink } from 'react-router-dom'

type ActionMenuPropsType = {
    deletePack: (packId: string) => void
    editPack: () => void
    learnPack: () => void
    packId: string
}

export const ActionsMenu: React.FC<ActionMenuPropsType> = ({ deletePack, editPack, learnPack, packId }) => {
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
                <div className={s.linkBlock} onClick={learnPack}>
                    <SchoolIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                    <span className={s.text}>Learn</span>
                </div>
            </div>
        </div>
    )
}
