import React from 'react'
import { Box, Rating, TableCell, TableRow } from '@mui/material'
import s from './CardRow.module.scss'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { CardType } from '../../../../../api/cardsAPI'
import { RemoveCardModal } from '../../../../modals/cardsModals/RemoveCardModal'
import { useModal } from '../../../../../common/components/Modal/useModal'
import { EditCardModal } from '../../../../modals/cardsModals/EditCardModal'

type CardRowPropsType = {
    row: CardType
    userId: string
    packId: string
}

const CardRow: React.FC<CardRowPropsType> = ({ row, userId, packId }) => {
    const { removeCardModal, toggleRemoveCardModal } = useModal()
    const { editCardModal, toggleEditCardModal } = useModal()

    const formatDate = (date: string): string => {
        return new Date(date).toLocaleDateString('ru', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    return (
        <>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                    {row.question}
                </TableCell>
                <TableCell align="left">{row.answer}</TableCell>
                <TableCell align="left">{formatDate(row.updated)}</TableCell>
                <TableCell align="left">
                    <Box sx={{ '& > legend': { mt: 2 } }}>
                        <Rating name="simple-controlled" value={row.grade} />
                    </Box>
                </TableCell>
                {row.user_id === userId && (
                    <TableCell align="left">
                        <div className={s.actions}>
                            <div className={s.editIcon}>
                                <BorderColorIcon
                                    fontSize={'small'}
                                    style={{ marginRight: '15px' }}
                                    onClick={toggleEditCardModal}
                                />
                            </div>
                            <div className={s.deleteIcon}>
                                <DeleteForeverIcon fontSize={'small'} onClick={toggleRemoveCardModal} />
                            </div>
                        </div>
                    </TableCell>
                )}
            </TableRow>
            <RemoveCardModal
                title={'Delete card'}
                id={row._id}
                cardName={row.question!}
                isShowing={removeCardModal}
                hide={toggleRemoveCardModal}
            />
            <EditCardModal
                title={'Edit card'}
                packId={packId} // from URL
                id={row._id}
                question={row.question!}
                answer={row.answer!}
                isShowing={editCardModal}
                hide={toggleEditCardModal}
            />
        </>
    )
}

export default CardRow
