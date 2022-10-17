import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Error404.module.css'

const W404 = () => {
    return (
        <div className={s.MainDiv}>
            <h1>Error: 404 page not found</h1>
            <p>Sorry, the page you're looking for cannot be accessed</p>
            <div>
                <NavLink to="/main" className={s.navlink}>
                    Back to MainPage
                </NavLink>
            </div>
        </div>
    )
}

export default W404
