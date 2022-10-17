import React from 'react';
import {ForgotPassword} from "./ForgotPassword";
import {NewPassword} from "./NewPassword";
import {PasswordRecovery} from "./PasswordRecovery";

const ForgotPasswordContant = () => {
    const page=1
    return (
        <>
          <ForgotPassword/>
          <NewPassword/>
          <PasswordRecovery/>
        </>
    );
};

