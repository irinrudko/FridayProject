import * as React from 'react'
import s from './BasicModal.module.scss'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

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
    open: boolean
    onClose: () => void
    onOpen: () => void
}

export function BasicModal(props: ModalType) {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    console.log('props.open', props.open)
    console.log('open', open)
    return (
        <div className={s.item}>
            <Button type={'button'} variant={'contained'} color={'primary'} className={s.buttonMain} onClick={handleOpen}>
                {props.title}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className={s.title}>
                        {props.title}
                    </Typography>
                    {props.children}
                    {/* <div className={s.buttonContainer}> */}
                    <Button onClick={handleClose} variant={'contained'} color={'inherit'} className={s.button}>
                        Cancel
                    </Button>
                    {/* </div> */}
                </Box>
            </Modal>
        </div>
    )
}
