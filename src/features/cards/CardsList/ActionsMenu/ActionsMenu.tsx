import React from 'react'
import s from './ActionsMenu.module.scss'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

type ActionMenuPropsType = {
    deletePack: () => void
    editPack: () => void
    learnPack: () => void
}

export const ActionsMenu: React.FC<ActionMenuPropsType> = ({ deletePack, editPack, learnPack }) => {
    return (
        <div>
            <div className={s.mainContainer}>
                <div className={s.linkBlock} onClick={editPack}>
                    <BorderColorIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                    <span className={s.text}>Edit</span>
                </div>
                <div className={s.linkBlock} onClick={deletePack}>
                    <DeleteForeverIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                    <span className={s.text}>Delete</span>
                </div>
                <div className={s.linkBlock} onClick={learnPack}>
                    <SchoolIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                    <span className={s.text}>Learn</span>
                </div>
            </div>
        </div>
    )
}
