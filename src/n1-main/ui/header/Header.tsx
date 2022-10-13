import React from 'react';
import {NavLink} from "react-router-dom";
import {routes} from "../routes/Routes";
import s from "./Header.module.scss"

const Header = () => {
    return (
        <div className={s.headerContainer}>
            <NavLink to={routes.profile} className={s.navLink}>Profile </NavLink>
            <NavLink to={routes.login} className={s.navLink}>Login </NavLink>
            <NavLink to={routes.registration} className={s.navLink}>Registration </NavLink>
            <NavLink to={routes.newPassword} className={s.navLink}>New Password </NavLink>
            <NavLink to={routes.passwordRecovery} className={s.navLink}>Password Recovery </NavLink>
            <NavLink to={routes.test} className={s.navLink}>Super Components </NavLink>
            <NavLink to={routes.w404} className={s.navLink}>404 </NavLink>
        </div>
    );
};

export default Header;