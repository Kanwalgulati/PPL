import React, { useState } from 'react'
import './ForgetPassword.css'
import axios from 'axios'
import Keys from '../../Config/keys'
import { useHistory } from 'react-router-dom'
import {Link} from 'react-router-dom'
const ResetPassword = (props) =>{
    let [getPassword,setPassword] = useState('')
    let [getConfirmPassword,setConfirmPassword] = useState('')
    let [getPasswordError,setPasswordError] = useState('') 
    let [getEmail,setEmail] = useState(props.location.state)
    let [getSuccess,setSuccess] = useState('')
    let [getLoginTrue,setLoginTrue] = useState(false)
    // console.log("props of reset PAssword : ",props.location.state)
    const updatePassword = (E) =>{
        setPassword(E.target.value)
        setPasswordError('')
    }
    const updateConfirmPassword = (E) =>{
        setConfirmPassword(E.target.value);
        setPasswordError('')
    }
    const validatePassword = (E) =>{
        if(getPassword == getConfirmPassword)
        {
            let obj = {
                email:getEmail,
                password : getPassword
            }
            axios.post(Keys.axiosCall.resetPassword,obj).then((response)=>{
                setSuccess("Password Sucessfully Reset")
                setLoginTrue(true)
            }).then((reject)=>{
                console.log("Error occured")
            })
        }
        else
        {
            setPasswordError("Password Doesn't match")
        }
        E.preventDefault()
    }
    return(
        <>
            <div className="content_rgt">
                <div className="register_sec">
                    <h1>Reset Password</h1>
                    <ul>
                        <li><span>Enter New Password</span><input type="text" placeholder="Enter your new password" onChange={updatePassword} /></li>
                        <li><span>Confirm Password</span><input type="text" placeholder="Enter your password again" onChange={updateConfirmPassword}/></li>
                        <p className="Error"> 
                            {getPasswordError}   
                        </p>
                        <li><input type="submit" defaultValue="Submit" onClick={validatePassword}/></li>
                        <p className="Success">
                            {getSuccess}
                        </p>
                        <p>
                            {getLoginTrue?<Link to='login'><a href="#">Login My Account !</a></Link>:null}
                        </p>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default ResetPassword