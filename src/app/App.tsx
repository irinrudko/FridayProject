import React from 'react';
import './App.css';
import Header from "./header/Header";
import Content from "./content/Content";
import {useAppSelector} from "./store";
import {RequestStatusType} from "./app-reducer";
import {LinearProgress} from "@mui/material";

function App() {
    const status = useAppSelector<RequestStatusType>(store => store.app.status)
    return (
        <div className="App">
            <Header/>
            {status === "loading" && <LinearProgress/>}
            <Content/>
        </div>
    );
}

export default App;
