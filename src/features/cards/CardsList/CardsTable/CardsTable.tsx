import React, { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import s from './CardsTable.module.scss'
import { useAppDispatch } from '../../../../app/store'
import { getCardsTC } from '../../cards-reducer'
import { CardType, GetCardParams } from '../../../../api/cardsAPI'
import CardRow from './CardRow/CardRow'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useParams } from 'react-router-dom'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

type CardsTablePropsType = {
    deleteCard: (cardId: string) => void
    editCard: () => void
    myCardPacks: CardType[]
    userId: string
    setFilterUpdateGrade: (sortCards: string) => void
}

export const CardsTable: React.FC<CardsTablePropsType> = ({
    deleteCard,
    editCard,
    myCardPacks,
    userId,
    setFilterUpdateGrade,
}) => {
    const dispatch = useAppDispatch()
    const [filter, setFilter] = useState(true)
    const [value, setValue] = React.useState<number | null>(5)

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
                            {/*{id === userId && <TableCell align="right"></TableCell>}*/}
                            {myCardPacks[0]._id && <TableCell align="right"></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myCardPacks.map((row: CardType) => (
                            <CardRow
                                key={row.cardsPack_id}
                                row={row}
                                deleteCard={deleteCard}
                                editCard={editCard}
                                userId={userId}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
