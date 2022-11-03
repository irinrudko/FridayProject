import * as React from 'react'
import s from './BasicModal.module.scss'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { openModalAC, closeModalAC } from '../../../app/app-reducer'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 395,
    height: 311,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
}

type ModalType = {
    children: React.ReactNode
    title: string
    onSaveClick: () => void
}

export function BasicModal(props: ModalType) {
    const dispatch = useAppDispatch()
    const closeModal = () => dispatch(closeModalAC())
    const modalStatus = useAppSelector((state) => state.app.isModalOpened)

    const onSave = () => {
        props.onSaveClick()
        closeModal()
    }

    return (
        <div className={s.item}>
            <Modal
                open={modalStatus}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className={s.title}>
                        {props.title}
                    </Typography>
                    {props.children}
                    <div className={s.buttonContainer}>
                        <Button onClick={closeModal} variant={'contained'} color={'inherit'} className={s.button}>
                            Cancel
                        </Button>
                        <Button
                            onClick={onSave}
                            variant={'contained'}
                            color={'primary'}
                            className={`${s.button} ${s.buttonPrimary}`}
                        >
                            Save
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
