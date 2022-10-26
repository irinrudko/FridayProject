import React, {useEffect} from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import s from './PackListTable.module.scss'
import {getPacksTC, removePackTC} from '../../packs-reducer'
import {useAppDispatch, useAppSelector} from '../../../../app/store'
import {GetPackParams} from '../../../../api/packsAPI'
import RowPack from './RowPack'

type PackListTablePropsType = {
    myPack: boolean
}

export const PackListTable: React.FC<PackListTablePropsType> = ({myPack}) => {
    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector((store) => store.packs.cardPacks)
    const userId = useAppSelector((store) => store.auth.user._id)

    const deletePack = (id: string) => {
        myPack ? dispatch(removePackTC(id, myCardPacksSettings)) : dispatch(removePackTC(id, cardPacksSettings))
    }

    const editPack = (id: string) => {
        alert('editPack:  ' + id)
    }

    const learnPack = (id: string) => {
        alert('learnPack:  ' + id)
    }

    const myCardPacksSettings: GetPackParams = {
        user_id: userId,
        pageCount: 8,
    }
    const cardPacksSettings: GetPackParams = {
        user_id: '',
        pageCount: 8,
    }
    useEffect(() => {
        dispatch(getPacksTC(cardPacksSettings))
    }, [])


    return (
        <div className={s.tableBlock}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{backgroundColor: '#EFEFEF'}}>
                            <TableCell style={{fontWeight: '600'}}>Name</TableCell>
                            <TableCell align="right" style={{fontWeight: '600'}}>
                                Cards
                            </TableCell>
                            <TableCell align="right" style={{fontWeight: '600'}}>
                                Last Updated
                            </TableCell>
                            <TableCell align="right" style={{fontWeight: '600'}}>
                                Created by
                            </TableCell>
                            <TableCell align="right" style={{fontWeight: '600'}}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((row, index) => (
                            <RowPack key={index} deletePack={deletePack} row={row} editPack={editPack}
                                     learnPack={learnPack}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
