import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '../routes/Routes'
import Profile from '../../features/profile/Profile'
import Registration from '../../features/auth/registration/Registration'
import NewPassword from '../../features/auth/forgotPassword/NewPassword'
import PasswordRecovery from '../../features/auth/forgotPassword/PasswordRecovery'
import Error404 from '../../common/components/Error404/Error404'
import s from './Content.module.css'
import { Main } from '../../features/main/Main'
import ForgotPassword from '../../features/auth/forgotPassword/ForgotPassword'
import { Login } from '../../features/auth/login/Login'

const Content = () => {
    return (
        <div className={s.contentBlock}>
            <Routes>
                <Route path={'/'} element={<Profile />} />
                <Route path={routes.main} element={<Main />} />
                <Route path={routes.profile} element={<Profile />} />
                <Route path={routes.profile} element={<Login />} />
                <Route path={routes.registration} element={<Registration />} />
                <Route path={routes.forgotPassword} element={<ForgotPassword />} />
                <Route path={routes.newPassword} element={<NewPassword />} />
                <Route path={routes.passwordRecovery} element={<PasswordRecovery />} />
                <Route path={routes.error404} element={<Error404 />} />
                <Route path={'/*'} element={<Navigate to={routes.error404} />} />
            </Routes>
        </div>
    )
}

export default Content
