import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "../routes/Routes";
import Profile from "../../features/profile/Profile";
import Login from "../../features/auth/login/Login";
import Registration from "../../features/auth/registration/Registration";
import NewPassword from "../../features/auth/foggotPassword/NewPassword";
import PasswordRecovery from "../../features/auth/foggotPassword/PasswordRecovery";
import Error404 from "../../common/components/Error404/Error404";
import s from "./Content.module.css"
import FoggotPassword from "../../features/auth/foggotPassword/FoggotPassword";
import {Main} from "../../features/main/Main";

const Content = () => {
    return (
        <div className={s.contentBlock}>
          <Routes>
              <Route path={"/"} element={<Profile/>}/>
              <Route path={routes.main} element={<Main/>}/>
              <Route path={routes.profile} element={<Profile/>}/>
              <Route path={routes.login} element={<Login/>}/>
              <Route path={routes.registration} element={<Registration/>}/>
              <Route path={routes.foggotPassword} element={<FoggotPassword/>}/>
              <Route path={routes.newPassword} element={<NewPassword/>}/>
              <Route path={routes.passwordRecovery} element={<PasswordRecovery/>}/>
              <Route path={routes.error404} element={<Error404/>}/>
              <Route path={'/*'} element={<Navigate to={routes.error404}/>}/>
          </Routes>
        </div>
    );
};

export default Content;