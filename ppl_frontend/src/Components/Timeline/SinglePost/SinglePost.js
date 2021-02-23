import React, { useEffect, useState } from 'react'
import ContentRight from '../ContentRight/ContentRight'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import Keys from '../../../Config/keys'
import LikeButton from '../Actions/LikeButton'
let imgPath = Keys.axiosCall.address;

const SinglePost = (props) =>{
    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }
    const imgData= props.imgData
    const query = useQuery()
    const imageId = query.get("id")
    let obj = { authorId: "",
        authorName: "",
        imageComment: [{comment:"",userName:""}],
        imageLikes: {total: 0, userId: []},
        img: "",
        imgDescription: "",
        imgTag: "",
        time: ""
    }
    let [getImageData,setImageData] = useState([obj])
    const imgObject = {
        authorName:getImageData[0].authorName,
        img:imgPath+getImageData[0].img,
        imgDescription:getImageData[0].imgDescription,
        imgTag:getImageData[0].imgTag,
        time:getImageData[0].time,
        likes:getImageData[0].imageLikes.total,
        getListOfUsers: getImageData[0].imageLikes.userId,
        getCommentDetails : getImageData[0].imageComment
    }
    let newLikeValue = imgObject.likes
    const LikeObj = {
      listOfUsers: imgObject.getListOfUsers,
      maximumLikes:newLikeValue,
      imgId:imageId,
      getImgData:imgData,
      imgLikes:imgObject.likes
    }
    let [getTrue,setTrue] = useState(false) 
    // const updateValue = 
    useEffect(() => {
        let obj = {
            id:imageId
        }
        axios.post(Keys.axiosCall.getspecificImage,obj).then(        
            (response)=>{
                console.log("In Axios call Single Post  ",response.data)
                setImageData(response.data)
            }).catch((error)=>{
                console.log("Not Working")
        })
        // setTrue(false)
        console.log("HelloWorld in Use Effetc")
    },[getTrue])

    let [getComment,setComment] = useState('')
    let [getUserName,setUserName] = useState(localStorage.getItem('name'))
    const updateComment = (E) =>{
      setComment(E.target.value)
    }
    const AddComment = (E) =>{
      const obj = {
        comment:getComment,
        userName:getUserName,
        id:imageId
      }
      axios.post(Keys.axiosCall.postComment,obj).then((response)=>{
        console.log("Comment Addedsdaasda ")
        // updateValue(true)
        setTrue(true)
      }).catch((reject)=>{
        console.log("Error Occured")
      })
    }
    return(
        <>
            <div className="content_lft">
              <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">User Interface PSD Source files Web Designing for web</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">{imgObject.imgTag}</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="/images/img_6.png" />{imgObject.authorName}</div>
                    <div className="div_top_rgt"><span className="span_date">{imgObject.time}</span><span className="span_time">11:15am</span></div>
                  </div>
                  <div className="div_image"><img src= {`${imgObject.img}`} alt="pet" /></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <LikeButton data = {LikeObj}/>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>4 Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contnt_3">
                <ul>
                {
                  imgObject.getCommentDetails.map(item =>{
                    return(
                      <li>
                      <div className="list_image">
                      <div className="image_sec"><img src="/images/post_img.png" /></div>
                      <div className="image_name">{item.userName}</div>
                      </div>
                      <div className="list_info">
                        {item.comment}
                    </div>
                    <input type="button" defaultValue="Reply" className="orng_btn" />
                  </li>
                    )
                  })
                 }
                    <div className="cmnt_div">
                      <input type="text" placeholder="Add a Comment" className="cmnt_bx" onChange = {updateComment}/>
                      <input type="submit" onClick={AddComment}  className="sub_bttn" defaultValue="Submit Comment" />
                    </div>
                  
                  
                </ul>
                <div className="view_div"><a href="#">View more</a></div>
              </div>
            </div>
        </>
    )
}
export default SinglePost