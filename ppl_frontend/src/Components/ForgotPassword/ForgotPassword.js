import React, { useState } from 'react'
import './ForgetPassword.css'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Keys from '../../Config/keys'

const ForgotPassword = () =>{
    function generateOTP() { 
        var digits = '0123456789'; 
        let OTP = ''; 
        for (let i = 0; i < 6; i++ ) { 
            OTP += digits[Math.floor(Math.random() * 10)]; 
        } 
        return OTP; 
    }
    const history = useHistory()
    let [getEmail,setEmail] = useState('')
    let [getEmailError,setEmailError] = useState('')
    let [getEmailTrue,setEmailTrue] = useState(false)
    let [getPasswordTrue,setPasswordTrue] = useState(false)
    let [getAuthError,setAuthError] = useState('')
    let [getUserOTP,setUserOTP] = useState('')
    let [getOTPError,setOTPError] = useState('')
    let [getOTP,setOTP] = useState(generateOTP())
    const updateEmail = (E) =>{
        setEmail(E.target.value)
        setAuthError('')
    }
    const validateEmail = (email) =>{
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)))
        {
            setEmailError('Email should be Valid')
            return false;
        }
        else
        {
            setEmailError('')
            return true;
        }
    }
    const forgotPassword = (E) =>{
        E.preventDefault()
        if(validateEmail(getEmail))
        {   
            const obj = {
                email:getEmail,
            }
            axios.post(Keys.axiosCall.resetValidateUser,obj).then((response)=>{
                const userData = response.data
                if(userData.length>0)
                {
                    let userObj = {
                        email:userData[0].email,
                        generatedOTP : getOTP
                    }
                    console.log("User Object :: ",userObj)
                    axios.post(Keys.axiosCall.nodemailer,userObj).then((resolve)=>{
                        console.log("Hello")
                    }).catch((reject)=>{
                        console.log("Eror Occured")
                    })
                    console.log("User Data : ",userData[0].email)
                    setEmailTrue(true)
                }
                else
                {
                    setAuthError('User Does not Exist')
                }
            }).catch((reject)=>{
                console.log("Error Occured")
            })
            console.log(getEmail) 
        }
    }
    const updateUserOTP = (E) =>{
        setUserOTP(E.target.value)
        setOTPError('')
    }
    const checkOk = (E) =>{
        console.log(getOTP)
        setEmailTrue(false)
        setPasswordTrue(true)
        E.preventDefault()
    }
    const validateOTP = (E) =>{
        console.log("Button Clicked")
        if(getOTP == getUserOTP)
        {
            history.push({
                pathname:'/resetpassword',
                state : getEmail
            })
        }
        else
        {
            setOTPError('invalid OTP')
        }
        E.preventDefault()
    }
    return(
        <>
            {getEmailTrue?
            <div className="popup_sec" id="pop_forgt">
                <div className="clos_btn"><img src="images/clos.png" alt="" id="clos_pop" /></div>
                <div className="pop_hdr">A mail has been send to your e-mail Id for Reset Password Link</div>
                <div className="man_contnt">
                    <span>Please Check Your Mail Box!</span>
                    <input onClick={checkOk} type="submit" value="Ok" />
                </div>
            </div>
            :null
            }
            {getPasswordTrue?
            <div className="popup_sec" id="pop_forgt">
                <div className="clos_btn"><img src="images/clos.png" alt="" id="clos_pop" /></div>
                <div className="pop_hdr">Enter 6 digit OTP</div>
                <div className="man_contnt">
                    <span><input type="text" onChange={updateUserOTP}/></span>
                    <input onClick={validateOTP} type="submit" value="Ok" />
                    <p className="Error">
                        {getOTPError}
                    </p>
                </div>
            </div>
            :null
            }
            <div className="content_rgt">
                <div className="register_sec">
                    <h1>Forgot Password</h1>
                    <ul>
                        <li><span>Enter E-mail ID</span><input type="text" placeholder="User@gmail.com" onChange={updateEmail}/></li>
                        <p className="error">{getEmailError}</p>
                        <li><input onClick={forgotPassword} type="submit" defaultValue="Submit" /></li>
                    </ul>
                    <p className="Error">
                        {getAuthError}
                    </p>
                </div>
            </div>
        </>
    )
}
export default ForgotPassword