import React, { Component, useState, useEffect } from 'react';

import axios from 'axios';
import '../../TimeLine.css';
import {Link} from 'react-router-dom'
import Keys from '../../../../Config/keys'

const UploadPost = (props) =>{
    
    let [getForm,setForm] = useState('')
    let [getImgData,setImgData] = useState('')
    let [getSuccessMsg,setSuccessMsg] = useState('')
    let [getErrorMsg,setErrorMsg] = useState('')
    let [getAuthorId,setAuthorId] = useState(localStorage.getItem('id'))
    let [getAuthorName,setAuthorName] = useState(localStorage.getItem('name'))
    let [showForm,setShowForm] = useState(false)
    let [getImgDescription,setImgDescription] = useState('')
    let [getTag,setTag] = useState('')
    console.log("Inside Upload Post :::: ",props.setTrue)
    const updateImgDescription = (E) =>{
        setImgDescription(E.target.value)
    }
    const updateImgData = (E) =>{
        setImgData(E.target.files[0])
        console.log("in updateImg Data : ",getImgData)
    }
    const updateTag = (E) =>{
        setTag(E.target.value)
    }
    
    const SubmitImage = (E) =>{
        E.preventDefault()
        // E.preventDefault()
        // setShowForm(false)
        setErrorMsg('')
        console.log("Tag Value : ",getTag)
        const formData = new FormData();
        formData.append('id',getAuthorId);
        formData.append('imgData',getImgData);
        formData.append('name',getAuthorName);
        formData.append('description',getImgDescription);
        formData.append('tag',getTag);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        if(getImgData == '')
        {
            setErrorMsg('Select Image First')
        }
        else
        {
            axios.post(Keys.axiosCall.upload,formData,config)
                .then((response) => {
                        props.setTrue(true)
                        setSuccessMsg('Image Uploaded')
                }).catch((error) => {
                    console.log(error)
            });
            setErrorMsg('')       
        }
        setShowForm(false)
        setForm('')
    }
    const uploadImage = () =>{
        if(showForm)
        {
            setShowForm(false)
        }
        else
        {

        setShowForm(true)
        }
    }
    return(
        <>
            <div className="rght_btn"> 
                    <span className="rght_btn_icon">
                        <img src="/images/btn_iconb.png" alt="up" />
                    </span> 
                    <span className="btn_sep">
                        <img src="/images/btn_sep.png" alt="sep" />
                    </span> 
                    <Link onClick={uploadImage} >Upload Post</Link> 
                </div>
                <div>
                {
                    console.log("showform value",showForm),
                    showForm? <form className="border center" onSubmit={SubmitImage} encType="multipart/form-data" >
                            <label className='content-margin' htmlFor='File'>Select File</label>
                            <input className='content-margin' type="file" name='imgData' onChange={updateImgData}/>
                            <label className='content-margin' htmlFor='imgTag'>Image Tag</label>
                            <input type="text" className='content-margin' placeholder="Tag" name = 'imgTag' onChange={updateTag}/>
                            <label className='content-margin' htmlFor='imgDescriptionlabel'>Image Description</label>
                            <textarea className='content-margin' placeholder="Decsription" name = 'imgDescription' onChange={updateImgDescription}/>
                            <input  className="btn btn-success center content-margin" type="submit" name="submit" />
                        </form> : <p></p>
                }
                </div>
                <p className="success">
                    {getSuccessMsg}
                </p>
                <p className="error">
                    {getErrorMsg}
                </p>
        </>
    )
}
export default UploadPost;