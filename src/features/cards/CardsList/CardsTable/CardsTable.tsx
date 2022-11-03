import React, { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import s from './CardsTable.module.scss'

import { CardType, GetCardParams } from '../../../../api/cardsAPI'
import CardRow from './CardRow/CardRow'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useParams } from 'react-router-dom'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

type CardsTablePropsType = {
    editCard: () => void
    myCardPacks: CardType[]
    userId: string
    setFilterUpdateGrade: (sortCards: string) => void
    packUserId: string
}

export const CardsTable: React.FC<CardsTablePropsType> = ({
    editCard,
    myCardPacks,
    userId,
    setFilterUpdateGrade,
    packUserId,
}) => {
    const [filter, setFilter] = useState(true)

    const { urlPackId } = useParams()
    const myPacksSettings: GetCardParams = { cardsPack_id: urlPackId! } //gets id from url. helps to save data if reloading  page

    const onclickHandler = () => {
        alert('filter')
    }

    const setFilterEndHandler = () => {
        setFilterUpdateGrade('1grade')
        setFilter(!filter)
    }

    const setFilterStartHandler = () => {
        setFilterUpdateGrade('0grade')
        setFilter(!filter)
    }

    return (
        <div className={s.tableBlock}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#EFEFEF' }}>
                            <TableCell style={{ fontWeight: '600' }} width={250}>
                                Question
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }} width={250}>
                                Answer
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }} width={150}>
                                Last Updated
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }}>
                                Grade
                                {filter ? (
                                    <ArrowDropDownIcon onClick={setFilterEndHandler} className={s.lastUpdate} />
                                ) : (
                                    <ArrowDropUpIcon onClick={setFilterStartHandler} className={s.lastUpdate} />
                                )}
                            </TableCell>
                            {packUserId === userId && <TableCell align="right"></TableCell>}
                        </TableRow>
                    </TableHead>
                    {myCardPacks.length ? (
                        <TableBody>
                            {myCardPacks.map((row: CardType) => (
                                <CardRow key={row._id} row={row} editCard={editCard} userId={userId} />
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
