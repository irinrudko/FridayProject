import React from 'react';
import {useDispatch} from "react-redux";
import {Alert, Snackbar} from "@mui/material";
import {useAppSelector} from "../../../app/store";
import {setErrAC} from "../../../app/app-reducer";


// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//     props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
// })

export function ErrorSnackbar() {
    const dispatch = useDispatch()
    const error = useAppSelector<string | null>(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setErrAC(null))
    }
    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' >
                {error}
            </Alert>
        </Snackbar>
    )
}


