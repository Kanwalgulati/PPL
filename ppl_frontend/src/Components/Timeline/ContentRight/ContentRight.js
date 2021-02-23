import React, { Component } from 'react';
import UploadPost from './Buttons/UploadPost';
import InviteFriends from './Buttons/InviteFriends';
import Categories from './Categories'
import Featured from './Featured';

const ContentRight = (props) =>{
        return(
            <>
            {console.log("Content Right : ",props.imgData)}
            <div className="content_rgt">
                <UploadPost setTrue = {props.imgData} />
                <InviteFriends />
                <Categories />
                <Featured />
            </div>
            </>
        )
}
export default ContentRight;