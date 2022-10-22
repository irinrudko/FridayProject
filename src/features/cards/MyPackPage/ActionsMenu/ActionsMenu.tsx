import React from 'react'
import s from './ActionsMenu.module.scss'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export const ActionsMenu = () => {
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
                <div className={s.linkBlock}>
                    <SchoolIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                    <span className={s.text}>Learn</span>
                </div>
            </div>
        </div>
    )
}
