import React, { useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import s from './PackListTable.module.scss'
import { removePackTC } from '../packs-reducer'
import { useAppDispatch } from '../../../../app/store'
import { GetPackParams, PackType } from '../../../../api/packsAPI'
import RowPack from './RowPack/RowPack'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

type PackListTablePropsType = {
    user_id: string
    userId: string
    cardPacks: PackType[]
    setFilterUpdatePack: (user_id: string, sortPacks: string) => void
}

export const PackListTable: React.FC<PackListTablePropsType> = ({ user_id, userId, cardPacks, setFilterUpdatePack }) => {
    const dispatch = useAppDispatch()
    const [filter, setFilter] = useState(true)

    const deletePack = (id: string) => {
        user_id === userId ? dispatch(removePackTC(id)) : dispatch(removePackTC(id))
    }

    const learnPack = (id: string) => {
        alert('learnPack:  ' + id)
    }

    const setFilterEndHandler = () => {
        setFilterUpdatePack('', '1updated')
        setFilter(!filter)
    }

    const setFilterStartHandler = () => {
        setFilterUpdatePack('', '0updated')
        setFilter(!filter)
    }

    const myCardPacksSettings: GetPackParams = {
        user_id: userId,
        pageCount: 8,
    }
    const cardPacksSettings: GetPackParams = {
        user_id: '',
        pageCount: 8,
    }

    return (
        <div className={s.tableBlock}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#EFEFEF' }}>
                            <TableCell style={{ fontWeight: '600' }} width={300}>
                                Name
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }} width={180}>
                                Cards
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }} width={180}>
                                Last Updated
                                {filter ? (
                                    <ArrowDropDownIcon onClick={setFilterEndHandler} className={s.lastUpdate} />
                                ) : (
                                    <ArrowDropUpIcon onClick={setFilterStartHandler} className={s.lastUpdate} />
                                )}
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }} width={180}>
                                Created by
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }} width={120}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {cardPacks.length ? (
                        <TableBody>
                            {cardPacks.map((row, index) => (
                                <RowPack key={index} deletePack={deletePack} row={row} learnPack={learnPack} />
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    No results matching your request
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        </div>
    )
}
