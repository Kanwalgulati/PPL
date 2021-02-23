import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import './loginUser.css'
import Keys from '../../Config/keys'

const LoginUser = (props) =>{
    const history = useHistory()
    if(localStorage.length>0)
    {
        history.push('/timeline')
    }
    let [getEmail,setEmail] = useState('')
    let [getPassword,setPassword] = useState('')
    let [getError,setError] = useState('')
    let [getEmailError,setEmailError] = useState('')
    let [getPasswordError,setPasswordError] = useState('')
    let [getEmailLabel,setEmailLabel] = useState('')
    let [getPasswordLabel,setPasswordLabel] =useState('')
    let [getEmailPlaceHolder,setEmailPlaceHolder] = useState('Email')
    let [getPasswordPlaceHolder,setPasswordPlaceHolder] = useState('Password')
    const updateEmail = (E) =>{
        setEmail(E.target.value)
        if(getEmail=='')
        {
            let data = getEmailLabel
            setEmailPlaceHolder(data)
            setEmailLabel('')
        }
        else
        {
            let data = E.target.attributes[1].value
            setEmailLabel(data)
        }
    }
    const updatePassword = (E) =>{
        setPassword(E.target.value)
        if(getPassword=='')
        {
            let data = getPasswordLabel
            setPasswordPlaceHolder(data)
            setPasswordLabel('')
            console.log("Get Password in If : ",getPassword)
        }
        else
        {
            let data = E.target.attributes[1].value
            // setPasswordLabel(data)
            console.log("Get Password in Else : ",getPassword)
            console.log("data : ",data)
        }
    }
    const updatePasswordPlaceHolder = (E) =>{
        if(getPassword=='')
        {
            let data = E.target.attributes[1].value;
            setPasswordPlaceHolder('')
            setPasswordLabel(data)
            console.log(E.target.attributes[1].value);
        }
    }
    const updateEmailPlaceHolder = (E) =>{
        if(getEmail == '')
        {
            let data = E.target.attributes[1].value;
            setEmailPlaceHolder('')
            setEmailLabel(data)    
        }
    }
    const updateEmailPlaceHolderOnBlur = (E) => {
        if(getEmail=='')
        {
        }
    }
    //Validate Data
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
    const validatePassword = (password) =>{
    if(password.length<8)
    {
        setPasswordError('Password is Invalid')
        return false;
    }
    else  
    {
        setPasswordError('')
          return true;
    }}
    const AuthenticateUser = (E) =>{
          const Userdata = {
              email : getEmail,
              password : getPassword
          }
          if(validateEmail(Userdata.email)&&validatePassword(Userdata.password))
          {
              console.log("All OK");
              axios.post(Keys.axiosCall.login,Userdata).then((response)=>{
              console.log("Front end Received Data ",response.data._id);
              var alreadyExist = 'Password is Incorrect';
              if(response.data=="0")
              {
                    setError(alreadyExist)
              }
              else
              {
                  setError('')
                  console.log("Success User Logged In")
                  localStorage.setItem('id',response.data._id)
                  localStorage.setItem('name',response.data.username)
                  history.push("/timeline")
              }
            }).catch(()=>{
                console.log("Error occured");
            })
        }
      }

    //End Validate Data

    return(
        <>
            <div>
                <div className="content_rgt">
                <div className="login_sec">
                <h1>Log In</h1>
                <ul>
                  <li><span >{getEmailLabel}</span><input type="text" placeholder={getEmailPlaceHolder} onChange={updateEmail} onFocus={updateEmailPlaceHolder} onBlur={updateEmailPlaceHolderOnBlur}/></li>
                  <p className="Error">
                        {getEmailError}
                  </p>
                  <li><span>{getPasswordLabel}</span><input type="text" placeholder={getPasswordPlaceHolder} onChange={updatePassword} onFocus={updatePasswordPlaceHolder}/></li>
                  <p className="Error">
                        {getPasswordError}
                  </p>
                  <li><input type="checkbox" />Remember Me</li>
                  <li><input type="submit" value="Log In" onClick={AuthenticateUser}/><Link to='/forgotpassword'>Forgot Password</Link></li>
                  <p className="Error">
                        {getError}
                  </p>
                </ul>
                <div className="addtnal_acnt">I do not have any account yet.<Link to='/register'>Create My Account Now !</Link></div>
              </div>
            </div>
            
      </div>
        </>
    )
}
export default LoginUser