import React, { useEffect } from 'react'
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Icon } from '@mui/material'
import s from './PackListTable.module.scss'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { routes } from '../../../../app/routes/Routes'
import { NavLink } from 'react-router-dom'
import { getPacksTC } from '../../packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { GetPackParams } from '../../../../api/packsAPI'

type PackListTablePropsType = {
    myPack: boolean
}

export const PackListTable: React.FC<PackListTablePropsType> = ({ myPack }) => {
    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector((store) => store.packs.cardPacks)
    const userId = useAppSelector((store) => store.auth.user._id)

    const myCardPacksSettings: GetPackParams = {
        user_id: userId,
        pageCount: 8,
    }
    const cardPacksSettings: GetPackParams = {
        user_id: '',
        pageCount: 8,
    }

    useEffect(() => {
        if (myPack) {
            dispatch(getPacksTC(myCardPacksSettings))
        } else if (!myPack) {
            dispatch(getPacksTC(cardPacksSettings))
        }
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
                        {cardPacks.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <NavLink to={routes.pagePack} className={s.navLink}>
                                        {row.name}
                                    </NavLink>
                                </TableCell>
                                <TableCell align="right">{row.cardsCount}</TableCell>
                                <TableCell align="right">{row.updated}</TableCell>
                                <TableCell align="right">{row.user_name}</TableCell>
                                <TableCell align="right">
                                    <div className={s.actions}>
                                        <SchoolIcon fontSize={'small'} style={{ marginRight: '15px' }} />
                                        <BorderColorIcon fontSize={'small'} style={{ marginRight: '15px' }} />
                                        <DeleteForeverIcon fontSize={'small'} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
