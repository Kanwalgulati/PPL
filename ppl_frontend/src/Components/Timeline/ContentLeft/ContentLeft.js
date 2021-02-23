import React, { Component, useState } from 'react'
import CheckBox from './CheckBox';
import ProfileData from './ProfileData'
import ShowImage from '../Actions/ShowImage'
const ContentLeft = (props) => {
    let imageData =  props.data
    let imgData = props.imgData
        return(
            <>

                <div className="content_lft">
                <div className="contnt_1">
                <CheckBox />
                <ProfileData />
              </div>
              {
                    imageData.map(item =>{
                        return(
                                <ShowImage data = {item} imgData={imgData}/>
                            )
                }) 
                }
            </div>
            </>
        )
}
export default ContentLeft;