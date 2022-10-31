import React from 'react'
import { setIdAC } from '../../table-reducer'
import { TableCell, TableRow } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../../../app/routes/Routes'
import s from './RowPack.module.scss'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { PackType } from '../../../../../api/packsAPI'
import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { setCardParams } from '../../../CardsList/cardParams-reducer'

type RowPropsType = {
    row: PackType
    deletePack: (rowId: string) => void
    editPack: (rowId: string) => void
    learnPack: (rowId: string) => void
}

const RowPack: React.FC<RowPropsType> = ({ row, deletePack, editPack, learnPack }) => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector((store) => store.auth.user._id)

    const setPackId = (id: string, userId: string) => {
        dispatch(setIdAC(id, userId))
        dispatch(setCardParams({ cardsPack_id: id }))
    }

    const formatDate = (date: string): string => {
        return new Date(date).toLocaleDateString('ru', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    const classEducation = row.cardsCount > 0 ? s.schoolIcon : s.blockSchoolIcon

    return (
        <>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                    <NavLink
                        to={`${'/packs/my-packs/'}${row._id}`}
                        className={s.navLink}
                        onClick={() => setPackId(row._id, row.user_id)}
                    >
                        {row.name}
                    </NavLink>
                </TableCell>
                <TableCell align="left">{row.cardsCount}</TableCell>
                <TableCell align="left">{formatDate(row.updated)}</TableCell>
                <TableCell align="left">{row.user_name}</TableCell>
                <TableCell align="left">
                    <div className={s.actions}>
                        <div className={classEducation}>
                            {row.cardsCount > 0 ? (
                                <NavLink to={`/packs/learn/${row._id}`}>
                                    <SchoolIcon fontSize={'small'} />
                                </NavLink>
                            ) : (
                                <SchoolIcon fontSize={'small'} />
                            )}
                        </div>
                        <div className={s.editIcon}>
                            {row.user_id === userId && <BorderColorIcon fontSize={'small'} onClick={() => editPack(row._id)} />}
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
