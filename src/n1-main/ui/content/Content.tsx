import React from 'react';
import {Route, Routes} from "react-router-dom";
import {routes} from "../routes/Routes";
import Profile from "../components/Profile";
import Login from "../../../n2-features/auth/login/Login";
import Registration from "../../../n2-features/auth/registration/Registration";
import NewPassword from "../../../n2-features/auth/NewPassword";
import PasswordRecovery from "../../../n2-features/auth/PasswordRecovery";
import TestSuper from "../components/TestSuper";
import W404 from "../assets/W404";
import s from "./Content.module.scss"

const Content = () => {
    return (
        <div className={s.contentBlock}>
          <Routes>
              <Route path={"/"} element={<Profile/>}/>
              <Route path={routes.profile} element={<Profile/>}/>
              <Route path={routes.login} element={<Login/>}/>
              <Route path={routes.registration} element={<Registration/>}/>
              <Route path={routes.newPassword} element={<NewPassword/>}/>
              <Route path={routes.passwordRecovery} element={<PasswordRecovery/>}/>
              <Route path={routes.test} element={<TestSuper/>}/>
              <Route path={routes.w404} element={<W404/>}/>
          </Routes>
        </div>
    );
};

export default Content;