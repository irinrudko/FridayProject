import React, { useEffect } from 'react'
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Icon } from '@mui/material'
import s from './PackListTable.module.scss'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { routes } from '../../../../app/routes/Routes'
import { NavLink } from 'react-router-dom'
import { getPacksTC, removePackTC } from '../../packs-reducer'
import { AppThunk, useAppDispatch, useAppSelector } from '../../../../app/store'
import { GetPackParams } from '../../../../api/packsAPI'
import { setIdAC } from '../table-reducer'

type PackListTablePropsType = {
    myPack: boolean
}

export const PackListTable: React.FC<PackListTablePropsType> = ({ myPack }) => {
    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector((store) => store.packs.cardPacks)
    const userId = useAppSelector((store) => store.auth.user._id)

    const deletePack = (id: string) => {
        myPack ? dispatch(removePackTC(id, myCardPacksSettings)) : dispatch(removePackTC(id, cardPacksSettings))
    }

    const myCardPacksSettings: GetPackParams = {
        user_id: userId,
        pageCount: 8,
    }
    const cardPacksSettings: GetPackParams = {
        user_id: '',
        pageCount: 8,
    }

    // const setPack = () => {
    //     dispatch(setPack())
    // }

    useEffect(() => {
        myPack ? dispatch(getPacksTC(myCardPacksSettings)) : dispatch(getPacksTC(cardPacksSettings))
    }, [myPack])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#EFEFEF' }}>
                            <TableCell style={{ fontWeight: '600' }}>Name</TableCell>
                            <TableCell align="right" style={{ fontWeight: '600' }}>
                                Cards
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: '600' }}>
                                Last Updated
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: '600' }}>
                                Created by
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: '600' }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((row, index) => {
                            const setPackId = (id: string) => {
                                dispatch(setIdAC(id))
                            }
                            return (
                                <>
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {/*{row._id === userId}*/}
                                            <NavLink
                                                to={routes.myPacksList}
                                                className={s.navLink}
                                                onClick={() => setPackId(row._id)}
                                            >
                                                {row.name}
                                            </NavLink>
                                        </TableCell>
                                        <TableCell align="right">{row.cardsCount}</TableCell>
                                        <TableCell align="right">{row.updated}</TableCell>
                                        <TableCell align="right">{row.user_name}</TableCell>
                                        <TableCell align="right">
                                            <div className={s.actions}>
                                                <div className={s.schoolIcon}>
                                                    <SchoolIcon fontSize={'small'} />
                                                </div>
                                                <div className={s.editIcon}>
                                                    {row.user_id === userId && <BorderColorIcon fontSize={'small'} />}
                                                </div>
                                                <div className={s.deleteIcon}>
                                                    {row.user_id === userId && (
                                                        <DeleteForeverIcon
                                                            fontSize={'small'}
                                                            onClick={() => deletePack(row._id)}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
