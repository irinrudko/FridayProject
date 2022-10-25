import React, { useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import s from './CardsTable.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { getCardsTC } from '../../cards-reducer'
import { CardType, GetCardParams } from '../../../../api/cardsAPI'
import CardRow from './CardRow/CardRow'

type CardsTablePropsType = {
    deleteCard: () => void
    editCard: () => void
    myCardPacks: CardType[]
    userId: string
    packId: string
}

export const CardsTable: React.FC<CardsTablePropsType> = ({ deleteCard, editCard, myCardPacks, userId, packId }) => {
    const dispatch = useAppDispatch()
    const [value, setValue] = React.useState<number | null>(5)
    const myPacksSettings: GetCardParams = { cardsPack_id: packId }

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
                            {userId && <TableCell align="right"></TableCell>}
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
