import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Keys from '../../../Config/keys'
import axios from 'axios'
import LikeButton from './LikeButton'

let img = Keys.axiosCall.address
const ShowImage = (props) => {    
        let imgData = props.imgData    
        let imgAddress = img+props.data.img;
        let imgDescription = props.data.imgDescription;
        let imgAuthor = props.data.authorName;
        let imgTag = props.data.imgTag;
        let time = props.data.time;
        let id = props.data._id;
        let [getImgLikes,setImgLikes] = useState(props.data.imageLikes.total)
        let [getAuthorId,setAuthorId] = useState(localStorage.getItem('id'))
        let [getLikeButtonValue,setLikeButtonValue] = useState(false);
        let newLikeValue = getImgLikes;
        let [getListOfUsers,setListOfUsres] = useState(props.data.imageLikes.userId);
        let currentUser = localStorage.getItem('id')
        let setFlag = false;
        // console.log("hello ",props.data)
        const LikeObj = {
          listOfUsers: getListOfUsers,
          maximumLikes:newLikeValue,
          imgId:id,
          getImgData:imgData,
          imgLikes:getImgLikes
        }
        console.log("Like object in Show Images : ",LikeObj)
        
        
        return(
            <>
                <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">User Interface PSD Source files Web Designing for web</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">{imgTag}</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="/images/img_6.png" />{imgAuthor}</div>
                    <div className="div_top_rgt"><span className="span_date">{time}</span><span className="span_time">11:15am</span></div>
                  </div>
                  <Link to = {`timeline/singlepost/?id=${id}`}><div className="div_image"><img src={imgAddress} alt="user" /></div></Link>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#" ><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <LikeButton data = {LikeObj}/>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>4 Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
        )
}
export default ShowImage