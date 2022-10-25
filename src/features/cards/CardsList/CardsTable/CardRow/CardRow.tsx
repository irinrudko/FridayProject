import React from 'react'
import { Box, Rating, TableCell, TableRow } from '@mui/material'
import s from '../CardsTable.module.scss'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { CardType } from '../../../../../api/cardsAPI'

type CardRowPropsType = {
    row: CardType
    user: boolean
    deleteCard: () => void
    editCard: () => void
}

const CardRow: React.FC<CardRowPropsType> = ({ row, user, deleteCard, editCard }) => {
    const formatDate = (date: string): string => {
        return new Date(date).toLocaleDateString('ru', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
                {row.question}
            </TableCell>
            <TableCell align="left">{row.answer}</TableCell>
            <TableCell align="left">{formatDate(row.updated)}</TableCell>
            <TableCell align="left">
                <Box sx={{ '& > legend': { mt: 2 } }}>
                    <Rating
                        name="simple-controlled"
                        value={row.grade}
                        // onChange={(event, newValue) => {}}
                    />
                </Box>
            </TableCell>
            {user && (
                <TableCell align="left">
                    <div className={s.actions}>
                        <BorderColorIcon fontSize={'small'} style={{ marginRight: '15px' }} onClick={editCard} />
                        <DeleteForeverIcon fontSize={'small'} onClick={deleteCard} />
                    </div>
                </TableCell>
            )}
        </TableRow>
    )
}

export default CardRow
