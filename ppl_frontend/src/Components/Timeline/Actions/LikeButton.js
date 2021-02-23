import React from 'react'
import Keys from '../../../Config/keys'
import axios from 'axios'
import {useState,useEffect} from 'react'
const LikeButton = (props) =>{
    // console.log("In single post Porps: : : ",props)
    const currentUser = localStorage.getItem('id');
    const getListOfUsers = props.data.listOfUsers;
    let newLikeValue = props.data.maximumLikes
    console.log("Likes Value ::: ",newLikeValue)
    const id = props.data.imgId
    const imgData = props.data.getImgData
    let setFlag = false;
    // let getImgLikes = props.data.imgLikes
    let [getImgLikes,setImgLikes] = useState(props.data.imgLikes) 
    console.log("Image Likes : ",props.data.imgLikes)
    console.log("getImageLikes ::::: ",getImgLikes)
    let [getAuthorId,setAuthorId] = useState(localStorage.getItem('id'))
    const postLikes = (E) => {
        E.preventDefault()
        console.log("current User : ",currentUser)
        getListOfUsers.forEach(item =>{
          if(item == currentUser)
          {
              console.log(item,"-----")
            setFlag=true
          }
        })
        if(setFlag)
        {
          newLikeValue=newLikeValue-1;
          let obj = {
            imgid : id,
            updatedLikeValue:newLikeValue,
            userId:getAuthorId
          }
          axios.post(Keys.axiosCall.removeLike,obj).then((response)=>{
            imgData(true)
         }).catch((reject)=>{
             console.log("Error Occured")
           })
        }
        else
        {
          newLikeValue=newLikeValue+1;
          let obj = {
          imgid : id,
          updatedLikeValue:newLikeValue,
          userId:getAuthorId
          }
          axios.post(Keys.axiosCall.postLikes,obj).then((response)=>{
          imgData(true)
          }).catch((reject)=>{
            console.log("Error Occured")
          })
        }
      }
    return(<>
        <li><a href="#" onClick={postLikes}><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>{getImgLikes} Likes</a></li>
    </>)
}
export default LikeButton