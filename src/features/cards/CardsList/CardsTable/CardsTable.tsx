import React, { useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import s from './CardsTable.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { getCardsTC } from '../../cards-reducer'
import { CardType, GetCardParams } from '../../../../api/cardsAPI'
import CardRow from './CardRow/CardRow'

type CardsTablePropsType = {
    user: any
    deleteCard: () => void
    editCard: () => void
}

export const CardsTable: React.FC<CardsTablePropsType> = ({ user, deleteCard, editCard }) => {
    const dispatch = useAppDispatch()
    const cardsId = useAppSelector((store) => store.table.packId)
    ////////////////исправить ошибку!!!!!!!!!!!!
    // @ts-ignore
    const myCardPacks = useAppSelector((store) => store.cards.cards)
    const [value, setValue] = React.useState<number | null>(5)

    const myPacksSettings: GetCardParams = {
        cardsPack_id: cardsId,
    }

    useEffect(() => {
        dispatch(getCardsTC(myPacksSettings))
    }, [])

    return (
        <div className={s.tableBlock}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#EFEFEF' }}>
                            <TableCell style={{ fontWeight: '600' }}>Question</TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }}>
                                Answer
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }}>
                                Last Updated
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }}>
                                Grade
                            </TableCell>
                            {user && <TableCell align="right"></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myCardPacks.map((row: CardType) => (
                            <CardRow key={row.cardsPack_id} row={row} user={user} deleteCard={deleteCard} editCard={editCard} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
