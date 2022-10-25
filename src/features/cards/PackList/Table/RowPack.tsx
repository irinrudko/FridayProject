import React from 'react'
import { setIdAC } from '../table-reducer'
import { TableCell, TableRow } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../../app/routes/Routes'
import s from './PackListTable.module.scss'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { PackType } from '../../../../api/packsAPI'
import { useAppDispatch, useAppSelector } from '../../../../app/store'

type RowPropsType = {
    row: PackType
    deletePack: (rowId: string) => void
}

const RowPack: React.FC<RowPropsType> = ({ row, deletePack }) => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector((store) => store.auth.user._id)

    const setPackId = (id: string) => {
        dispatch(setIdAC(id))
    }

    const formatDate = (date: string): string => {
        return new Date(date).toLocaleDateString('ru', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    return (
        <>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                    <NavLink to={routes.myPacksList} className={s.navLink} onClick={() => setPackId(row._id)}>
                        {row.name}
                    </NavLink>
                </TableCell>
                <TableCell align="right">{row.cardsCount}</TableCell>
                <TableCell align="right">{formatDate(row.updated)}</TableCell>
                <TableCell align="right">{row.user_name}</TableCell>
                <TableCell align="right">
                    <div className={s.actions}>
                        <div className={s.schoolIcon}>
                            <SchoolIcon fontSize={'small'} onClick={() => {}} />
                        </div>
                        <div className={s.editIcon}>
                            {row.user_id === userId && <BorderColorIcon fontSize={'small'} onClick={() => {}} />}
                        </div>
                        <div className={s.deleteIcon}>
                            {row.user_id === userId && (
                                <DeleteForeverIcon fontSize={'small'} onClick={() => deletePack(row._id)} />
                            )}
                        </div>
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}

export default RowPack
