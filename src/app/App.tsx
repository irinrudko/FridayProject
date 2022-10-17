import React from 'react'
import './App.css'
import Header from './header/Header'
import Content from './content/Content'
import { useAppSelector } from './store'
import { RequestStatusType } from './app-reducer'
import { LinearProgress } from '@mui/material'
import { ErrorSnackbar } from '../common/components/ErrorSnackBar/ErrorSnackBar'

function App() {
    const status = useAppSelector<RequestStatusType>((store) => store.app.status)
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
