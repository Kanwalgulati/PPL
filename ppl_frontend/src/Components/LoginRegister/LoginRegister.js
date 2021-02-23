import React, { Component } from 'react';
import LoginUser from '../LoginUser/LoginUser';
import { Switch ,Route } from 'react-router-dom';
import LeftContent from '../Common/LeftContent';
import RegisterUser from '../RegisterUser/RegisterUser';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import ResetPassword from '../ForgotPassword/ResetPassword';
const LoginRegister = () => {
        return(
            <>
                <LeftContent />
                <Switch>
                    <Route path = "/" component = {RegisterUser} exact />
                    <Route path = "/login" component ={LoginUser} exact/>
                    <Route path = "/register" component ={RegisterUser} exact/>
                    <Route path = "/forgotpassword" component = {ForgotPassword} exact/>
                    <Route path = "/resetpassword" component = {ResetPassword} />
                </Switch>
            </>
        )
}
export default LoginRegister;