import * as React from 'react'
import ReactDOM from 'react-dom'
import s from './BasicModal.module.scss'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

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

    isShowing: boolean
    hide: () => void
    buttonTitle?: string
}

//TODO:
//exit onBlur

export const BasicModal: React.FC<ModalType> = ({ isShowing, hide, children, title, onSaveClick, buttonTitle }) =>
    isShowing
        ? ReactDOM.createPortal(
              <>
                  <div className={s.item}>
                      <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2" className={s.title}>
                              {title}
                          </Typography>
                          {children}
                          <div className={s.buttonContainer}>
                              <Button onClick={hide} variant={'contained'} color={'inherit'} className={s.button}>
                                  Cancel
                              </Button>
                              <Button
                                  onClick={() => {
                                      onSaveClick()
                                      hide()
                                  }}
                                  variant={'contained'}
                                  color={'primary'}
                                  className={`${s.button} ${s.buttonPrimary}`}
                              >
                                  {buttonTitle || 'Save'}
                              </Button>
                          </div>
                      </Box>
                  </div>
              </>,
              document.body
          )
        : null