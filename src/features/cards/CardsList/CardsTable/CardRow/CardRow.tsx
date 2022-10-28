import React from 'react'
import { Box, Rating, TableCell, TableRow } from '@mui/material'
import s from './CardRow.module.scss'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { CardType } from '../../../../../api/cardsAPI'

type CardRowPropsType = {
    row: CardType
    userId: string
    deleteCard: (cardId: string) => void
    editCard: () => void
}

const CardRow: React.FC<CardRowPropsType> = ({ row, userId, deleteCard, editCard }) => {
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
            {row.user_id === userId && (
                <TableCell align="left">
                    <div className={s.actions}>
                        <div className={s.editIcon}>
                            <BorderColorIcon fontSize={'small'} style={{ marginRight: '15px' }} onClick={editCard} />
                        </div>
                        <div className={s.deleteIcon}>
                            <DeleteForeverIcon fontSize={'small'} onClick={() => deleteCard(row._id)} />
                        </div>
                    </div>
                </TableCell>
            )}
        </TableRow>
    )
}

export default CardRow
