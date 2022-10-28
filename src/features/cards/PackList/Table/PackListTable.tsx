import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import s from './PackListTable.module.scss'
import { removePackTC } from '../../packs-reducer'
import { useAppDispatch } from '../../../../app/store'
import { GetPackParams, PackType } from '../../../../api/packsAPI'
import RowPack from './RowPack/RowPack'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

type PackListTablePropsType = {
    user_id: string
    userId: string
    cardPacks: PackType[]
}

export const PackListTable: React.FC<PackListTablePropsType> = ({ user_id, userId, cardPacks }) => {
    const dispatch = useAppDispatch()

    const deletePack = (id: string) => {
        user_id === userId ? dispatch(removePackTC(id, myCardPacksSettings)) : dispatch(removePackTC(id, cardPacksSettings))
    }

    const editPack = (id: string) => {
        alert('editPack:  ' + id)
    }

    const learnPack = (id: string) => {
        alert('learnPack:  ' + id)
    }

    const onclickHandler = () => {
        alert('filter')
    }

    const myCardPacksSettings: GetPackParams = {
        user_id: userId,
        pageCount: 8,
    }
    const cardPacksSettings: GetPackParams = {
        user_id: '',
        pageCount: 8,
    }
    // useEffect(() => {
    //     dispatch(getPacksTC(cardPacksSettings))
    // }, [])

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
                                <ArrowDropDownIcon onClick={onclickHandler} className={s.lastUpdate} />
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }} width={180}>
                                Created by
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }} width={120}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((row, index) => (
                            <RowPack key={index} deletePack={deletePack} row={row} editPack={editPack} learnPack={learnPack} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
