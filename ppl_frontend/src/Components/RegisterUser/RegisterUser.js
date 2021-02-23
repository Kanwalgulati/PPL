import React, { useState } from 'react';
import axios from 'axios'
import './registerUser.css'
import { Link, useHistory } from 'react-router-dom';
import Keys from '../../Config/keys'
const RegisterUser = () =>{
  const history = useHistory();
    if(localStorage.length>0)
    {
        history.push('/timeline')
    }
    let [getUserName,setUserName] = useState('')
    let [getPassword,setPassword] = useState('')
    let [getEmail,setEmail] = useState('')
    let [getFirstName,setFirstname] = useState('')
    let [getLastName,setLastName] = useState('')
    let [getCheckBox,setCheckBox] = useState(false)
    let [getUserNameError,setUserNameError] = useState('')
    let [getPasswordError,setPasswordError] = useState('')
    let [getEmailError,setEmailError] = useState('')
    let [getFirstNameError,setFirstNameError] = useState('')
    let [getLastNameError,setLastNameError] = useState('')
    let [getCheckBoXError,setCheckBoxError] = useState('')
    let [getUserRegisteredSuccess,setUserRegisteredSuccess] = useState('')
    let [getUserRegisteredError,setUserRegisteredError] = useState('')
    const updateUserName = (E) =>{
      setUserName(E.target.value)
    }
    const updatePassword = (E) =>{
      setPassword(E.target.value);
    }
    const updateEmail = (E) =>{
      setEmail(E.target.value);
    }
    const updateFirstName = (E) =>{
      setFirstname(E.target.value);
    }
    const updateLastName = (E) =>{
      setLastName(E.target.value);
    }
    const updateCheckbox = (E) =>{
      setCheckBox(E.target.value)
    }

    //Validate Data

    const validateUserName = (username) =>{
      console.log("User Name : ",username," Length : ",username.length);
      if(username.length<3)
      {
        setUserNameError("User Name should be Minimum 3 Character long")
        return false;
      }
      else
      {
        setUserNameError("")
        return true;
      }
    }
    const validatePassword = (password) =>{
      if(password.length<8)
      {
        setPasswordError('Password should be Minimum 8 Character long')
        return false;
      }
      else
      {
        setPasswordError('')
        return true;
      }
    }
    const validateFirstName = (firstName) =>{
      if(firstName.length<1)
      {
        setFirstNameError('First Name cannot be empty')
        return false;
      }
      else
      {
        setFirstNameError('')
        return true;
      }  
    }
    const validateLastName = (lastName) =>{
      if(lastName.length<1)
      {
        setLastNameError('Last Name cannot be empty')
        return false;
      }
      else
      {
        setLastNameError('')
        return true;
      }
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
        return true
      }
    }
    const validateCheckBox = (checkBoxValue) =>
    {
      if(checkBoxValue=='on')
      {
        setCheckBoxError('')
        return true;
      }
      else
      {
        setCheckBoxError('You must agree to our terms & Conditions')
        return false;
      }
    }
    const validateUserAndSubmit = (E) =>{
      const registeredUser = {
        username:getUserName,
        email:getEmail,
        password:getPassword,
        firstname:getFirstName,
        lastname:getLastName,
        checkbox:getCheckBox
      }
      if(
        validateUserName(registeredUser.username)&&
        validatePassword(registeredUser.password)&&
        validateEmail(registeredUser.email)&&
        validateFirstName(registeredUser.firstname)&&
        validateLastName(registeredUser.lastname)&&
        validateCheckBox(registeredUser.checkbox))
        {
            axios.post(Keys.axiosCall.register,registeredUser).then((response)=>{
            console.log(response.data);
            var alreadyExist = 'User Already exist';
            var userInserted = 'Successfully Registered'
            if(response.data==0)
            {
                setUserRegisteredError(alreadyExist)
                setUserRegisteredSuccess('')
            }
            else
            {
              setUserRegisteredSuccess(userInserted)
              setUserRegisteredError('')
            }
        }).catch(()=>{
          console.log("Error occured");
        })
        }
    }
    //Validate Data End
    return(
        <>
            <div>
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Create An Account</h1>
                <ul>
                  <li><span>Username</span><input type="text" placeholder="Enter your username" name="username" onChange={updateUserName} /></li>
                  <p className='errorMsg'>
                      {getUserNameError}
                  </p>
                  <li><span>Password</span><input type="text" placeholder="Enter your password" onChange = {updatePassword} /></li>
                  <p className='errorMsg'>
                    {getPasswordError}
                  </p>
                  <li><span>Email</span><input type="text" placeholder="Enter your email" onChange = {updateEmail}/></li>
                  <p className='errorMsg'>
                      {getEmailError}
                  </p>
                  <li><span>First Name</span><input type="text" placeholder="Enter your first name" onChange = {updateFirstName}/></li>
                  <p className='erorMsg'>
                      {getFirstNameError}
                  </p>
                  <li><span>Last Name</span><input type="text" placeholder="Enter your last name" onChange = {updateLastName}/></li>
                  <p className='errorMsg'>
                      {getLastNameError}
                  </p>
                  <li><input type="checkbox" onChange = {updateCheckbox}/>I agree to Term &amp; Conditions</li>
                  <p className='errorMsg'>
                      {getCheckBoXError}
                  </p>
                  <li><input type="submit" defaultValue="Register" value="Register" onClick={validateUserAndSubmit}/></li>
                  <p className="successPage">
                      {getUserRegisteredSuccess}
                  </p>
                  <p className='ErrorPage'>
                    {getUserRegisteredError}
                  </p>
                </ul>
                <div className="addtnal_acnt">I already have an account.<Link to='login'><a href="#">Login My Account !</a></Link></div>
              </div>
            </div>
          </div>
        </>
    )
}
export default RegisterUser