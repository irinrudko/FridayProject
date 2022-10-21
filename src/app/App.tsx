import React, { useEffect } from 'react'
import './App.css'
import Header from './header/Header'
import Content from './content/Content'
import { CircularProgress, LinearProgress } from '@mui/material'
import { ErrorSnackbar } from '../common/components/ErrorSnackBar/ErrorSnackBar'
import { AppRootStateType, useAppDispatch, useAppSelector } from './store'
import { initializedTC, RequestStatusType } from './app-reducer'

function App() {
    // debugger
    const status = useAppSelector<RequestStatusType>((store: AppRootStateType) => store.app.status)
    const dispatch = useAppDispatch()
    const initialized = useAppSelector<boolean>((store: AppRootStateType) => store.app.initialized)

    useEffect(() => {
        dispatch(initializedTC())
    }, [])

    if (!initialized) {
        return (
            <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="App">
            <Header />
            {status === 'loading' && <LinearProgress />}
            {status === 'failed' && <LinearProgress color="error" variant="determinate" value={0} />}
            {status === 'succeeded' && <LinearProgress color="success" variant="determinate" value={0} />}
            <Content />
            <ErrorSnackbar />
        </div>
    )
}

export default App
